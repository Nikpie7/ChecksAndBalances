import { render } from "@testing-library/react";
import { React, useState } from "react";
import { useQuery } from "react-query";

import "./LegislationTable.css";

import dashboardService from "../utils/dashboardService.js";

// ONLY FOR TESTING!!!!
// TODO: REOVE THIS
const USER_ID = { userId: "65580d043bdf8a775970f892" };

// Define the current Congress.
// Would want to eventually update this to dynamic check
// if we were to further this app.
const CONGRESS_NUM = 118;

const LegistlationTable = () => {
  // Get user's interests.
  const {
    data: interests,
    isLoading,
    isError,
  } = useQuery(["interestsData", USER_ID], () =>
    dashboardService.getReadInterests(USER_ID)
  );

  //TODO: Add custom animations.
  if (isLoading) return <p>Loading...</p>;
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
      {/* LegistlationList */}
      <LegistlationList userInterests={userInterestsTemp} />
    </div>
  );
};

const LegistlationList = (props) => {
  const userInterests = props.userInterests;

  return (
    <div className="grid justify-normal">
      <ul>
        {
          <li className="">
            {/* Mobile = Bill name + short description
                Web = Bill Name + short description + committee*/}
            {/* Iterate through each interest. */}
            {userInterests.map((interest) => (
              <BillList key={interest} Interest={interest} />
            ))}
          </li>
        }
      </ul>
    </div>
  );
};

const BillList = (props) => {
  const currInterest = props.Interest;

  // Get bills for current interest.
  const {
    data: bills,
    isLoading,
    isError,
  } = useQuery(["billsData", { Interest: currInterest }], () =>
    dashboardService.postSearchBillsByInterest({ Interest: currInterest })
  );

  //TODO: Add custom animations.
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  // Hold bills temporarily.
  let billList = bills.response;

  return (
    <div className="">
      {/* Iterate through each bill. */}
      {billList.map((bill) => (
        <div
          key={bill._id}
          id="legislationList-row"
          className="shadow-2xl p-4 m-8 rounded-lg hover:scale-105 duration-300"
        >
          <Bill currBill={bill} />
        </div>
      ))}
    </div>
  );
};

const Bill = (props) => {
  const bill = props.currBill;

  return (
    <div>
      <h1 className="md:text-lg line-clamp-2 xl:line-clamp-1">
        <b>{bill.Title}</b>
      </h1>
      <h2>{bill.BillType.toUpperCase()}.{bill.BillNumber}</h2>
    </div>
  );
};

export default LegistlationTable;
