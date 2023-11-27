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

import interestsCategories from "./interestsCategories.json";
import "./BillTable.css";

import dashboardService from "../utils/dashboardService.js";
import LoadingWheel from "./LoadingWheel.js"

// ONLY FOR TESTING!!!!
// TODO: REMOVE THIS
const USER_ID = { userId: "65580d043bdf8a775970f892" };

// Define the current Congress.
// Would want to eventually update this to dynamic check
// if we were to further this app.
const CONGRESS_NUM = 118;

// Used to help pass state hooks for bill data down to child component
const MyContext = createContext();

const BillTable = ({ setClickedBillData, handleOpenBillModal }) => {
  // Get user's interests.
  const {
    data: interests,
    isLoading,
    isError,
  } = useQuery(["interestsData", USER_ID], () =>
    dashboardService.getReadInterests(USER_ID)
  );

  if (isLoading) return <LoadingWheel />;
  if (isError) return <p>Error...</p>;

  let userInterestsTemp = [];

  // Iterate through all interests and save ones user follows.
  for (let i = 0; i < interests.Interests.length; i++) {
    if (interests.Interests[i].value) {
      userInterestsTemp.push(interests.Interests[i].InterestName);
    }
  }

  return (
    <div>
      <MyContext.Provider value={{ setClickedBillData, handleOpenBillModal }}>
        {/* LegistlationList */}
        <BillList userInterests={userInterestsTemp} />
      </MyContext.Provider>
    </div>
  );
};

const BillList = (props) => {
  const userInterests = props.userInterests;
  let billListTemp = [];

  // Get bills for user's interests.
  const {
    data: bills,
    isLoading,
    isError,
  } = useQuery(["billsData", interestsCategories], () =>
    Promise.all(
      userInterests.map(async (interest) =>
        dashboardService.postSearchBillsByInterest({ Interest: interest })
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

  return (
    <div className="grid justify-normal">
      <ul>
        {/* Iterate through each interest. */}
        {billListTemp.map((bill) => (
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

export default BillTable;
