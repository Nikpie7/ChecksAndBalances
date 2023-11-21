import { render } from "@testing-library/react";
import { React, useState } from "react";

import bills from "./legislationListTestData";
import "./LegislationTable.css";

import dashboardService from "../utils/dashboardService.js";

// ONLY FOR TESTING!!!!
// TODO: REMOVE THIS
const USER_ID = { userId: "65580d043bdf8a775970f892" };

// Define the current Congress.
// Would want to eventually update this to dynamic check
// if we were to further this app.
const CONGRESS_NUM = 118;

const LegistlationTable = () => {
  // Hold bills.
  const [billList, setBillList] = useState([]);

  // const [billNum, setbillNum] = useState("");

  // Get user's interests.
  dashboardService.getReadInterests(USER_ID).then((interestsData) => {
    // Hold interests data.
    let interests = interestsData.Interests;

    // Iterate through interests.
    for (let i = 0; i < interests.length; i++) {
      if (interests[i].value === true) {
        // Get bill #s for current interest.
        dashboardService
          .getGetBillsByInterests(interests[i].InterestName)
          .then((billNumbers) => {
            // Iterate through all bills related to interest.
            for (const billNumber in billNumbers) {
              
              // Get bill info for house and senate.
              for (const billType in ["hr", "s"]) {
                // Get bill titles.
                let billTitles = dashboardService.getGetBillTitles(
                  CONGRESS_NUM,
                  billType,
                  billNumber
                );

                // Get Bill summaries.
                let billSummary = dashboardService.getGetBillSummaries(
                  CONGRESS_NUM,
                  billType,
                  billNumber
                );

                // Get bill committees.
                let billcommittees = dashboardService.getGetBillCommittees(
                  CONGRESS_NUM,
                  billType,
                  billNumber
                );

                // Add bill info to list.
                setBillList((billList) => [
                  ...billList,
                  {
                    title: billTitles.titles[0].title,
                    summary: billSummary.summaries[0].text,
                    committees: billcommittees.committees[0].name,
                  },
                ]);
              }
            }
          });
      }
    }
  });

  return (
    <div>
      {/* LegistlationList */}
      <LegistlationList bills={billList} />
    </div>
  );
};

const LegistlationList = (props) => {
  let bills = props.bills;

  // Render the row for each piece of legislation.
  const renderLegislationRow = (bill) => {
    return (
      <div
        key={bill.title}
        id="legislationList-row"
        className="grid grid-flow-row shadow-2xl p-4 m-8 rounded-lg hover:scale-105 duration-300"
      >
        <li>
          {/* Mobile = Bill name + short description
              Web = Bill Name + short description + committee*/}
          <h1>{bill.title}</h1>
          <h2>{bill.committee}</h2>
        </li>
      </div>
    );
  };

  return (
    <div className="grid justify-center md:justify-normal">
      <ul>
        {bills.map((bill) =>
          // Create rows.
          renderLegislationRow(bill)
        )}
      </ul>
    </div>
  );
};

export default LegistlationTable;
