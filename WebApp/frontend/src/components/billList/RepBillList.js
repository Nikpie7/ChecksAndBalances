import { render } from "@testing-library/react";
import {
  React,
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { useQuery } from "react-query";

import interestsCategories from "../interestsCategories.json";
import "./BillTable.css";

import dashboardService from "../../utils/dashboardService.js";
import LoadingWheel from "../LoadingWheel.js";

// ONLY FOR TESTING!!!!
// TODO: REMOVE THIS
const USER_TOKEN = {
  token: JSON.parse(sessionStorage.getItem('token'))
    // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY4Mjk1OWFmZGY5ODc5NDljY2NmZSIsImZpcnN0TmFtZSI6IlRlc3QyIiwibGFzdE5hbWUiOiJUZXN0MiIsInBhc3N3b3JkIjoiIVRlc3QxMjMiLCJlbWFpbCI6IlRlc3RlcjJAdGVzdC5jb20iLCJhZGRyZXNzIjoiNDAwMCBDZW50cmFsIEZsb3JpZGEgQmx2ZC4gT3JsYW5kbywgRkwgMzI4MTYiLCJpYXQiOjE3MDExMTEwMTksImV4cCI6MTcwMTE5NzQxOX0.iKI-ltuvV0Fb5F68UvBdW5rt72HjM_N9FhI8yHwkXHk",
};

// Define the current Congress.
// Would want to eventually update this to dynamic check
// if we were to further this app.
const CONGRESS_NUM = 118;

// Used to help pass state hooks for bill data down to child component
const MyContext = createContext();

const RepBillList = ({ setClickedBillData, handleOpenBillModal }) => {
  const {
    data: reps,
    isLoading,
    isError,
  } =  useQuery(["repsData", USER_TOKEN], () =>
    dashboardService.postGetReps(USER_TOKEN)
  );

  if (isLoading) return <LoadingWheel />;
  if (isError) return <p>Error...</p>;

  // TODO: ADD BETTER STYLE IF USER HAS NO INTERESTS
  if (reps === undefined) {
    return <h1>Unable to load your representative's bills. :(</h1>;
  }

  // Hold all user's politician.
  const userPoliticians = [];

  const removeMiddleName = (politician) => {
    // Break string at whitespace.
    let strTokens = politician.split(" ");


    return strTokens[0] + " " + strTokens[strTokens.length - 1];
  };

  // Add to list for grouped query.
  userPoliticians.push(removeMiddleName(reps.Senator1));
  userPoliticians.push(removeMiddleName(reps.Senator2));
  userPoliticians.push(removeMiddleName(reps.Representative));

  return (
    <div>
      <MyContext.Provider value={{ setClickedBillData, handleOpenBillModal }}>
        {/* LegistlationList */}
        <BillList politicians={userPoliticians} />
      </MyContext.Provider>
    </div>
  );
};

const BillList = (props) => {
  const politicians = props.politicians;

  let billListTemp = [];

  // Get bills for user's interests.
  const {
    data: bills,
    isLoading,
    isError,
  } = useQuery(["billsData", interestsCategories], () =>
    Promise.all(
      politicians.map(async (politician) =>
        dashboardService.postSearchBillsSponsors({ member: politician })
      )
    )
  );

  //TODO: Add custom animations.
  if (isLoading) return <LoadingWheel />;
  if (isError) return <p>Error...</p>;

  // Iterate through each interest category.
  for (let i = 0; i < bills.length; i++) {
    // Iterate through all bills for current interest.
    for (let j = 0; j < bills[i].response.length; j++) {
      billListTemp.push(bills[i].response[j]);
    }
  }

  // Sort all the bills by date.
  billListTemp.sort(
    (a, b) => new Date(a.LastUpdated) - new Date(b.LastUpdated)
  );

  // Reverse so it's in descending order.
  billListTemp.reverse();

  // Remove possible duplicates by converting to a set.
  let billObjects = billListTemp.map(JSON.stringify);
  let billSet = new Set(billObjects);
  let billList = Array.from(billSet).map(JSON.parse);

  return (
    <div className="grid justify-normal">
      <ul>
        {/* Iterate through each interest. */}
        {billList.map((bill) => (
          <Bill key={bill._id} currBill={bill} />
        ))}
      </ul>
    </div>
  );
};

const Bill = (props) => {
  const bill = props.currBill;
  const { setClickedBillData, handleOpenBillModal } = useContext(MyContext);

  const handleBillListClick = () => {
    setClickedBillData(bill);
    handleOpenBillModal();
  };

  return (
    <div
      id="billList-row"
      className="shadow-2xl p-4 m-8 rounded-lg hover:scale-105 duration-300"
    >
      <li onClick={handleBillListClick} className="hover:cursor-pointer">
        <h1 className="md:text-lg line-clamp-2 xl:line-clamp-1">
          <b>{bill.Title}</b>
        </h1>
        <h2>
          {bill.BillType.toUpperCase()}.{bill.BillNumber}
        </h2>
      </li>
    </div>
  );
};

export default RepBillList;
