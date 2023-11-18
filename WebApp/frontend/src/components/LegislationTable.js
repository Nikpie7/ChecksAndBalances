import { render } from "@testing-library/react";
import { React, useState } from "react";

import legislativeBills from "./legislationListTestData";
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

  const [billNum, setbillNum] = useState("");

  // Get user's interests.
  let interests = dashboardService.getReadInterests(USER_ID);

  console.log(interests.Interests)

  // Get bill #s from list of interests.
  // for (interests)
  // if interest is true
  // Get bill #s for interest
  // for (bill #s)
  // Get title.
  // Get Committee(s).
  // Get short description.

  // Get bill title.

  // Get Committees attached to bill.
  // Get bill's short description.

  return (
    <div>
      {/* LegistlationList */}
      <LegistlationList data={legislativeBills} />
    </div>
  );
};

const LegistlationList = (props) => {
  let data = props.data;
  const listRows = data.map(data => <h1>{data.billName}</h1>, <h2>{data.committee}</h2>)

  // Render the row for each piece of legislation.
  const renderLegislationRow = (legislationObj, index) => {
    return (
      <div
        id="legislationList-row"
        class="grid grid-flow-row shadow-2xl p-4 m-8 rounded-lg hover:scale-105 duration-300"
      >
        <li key={index}>
          {/* Mobile = Bill name + short description
              Web = Bill Name + short description + committee*/}
          <h1>{legislationObj.billName}</h1>
          <h2>{legislationObj.committee}</h2>
        </li>
      </div>
    );
  };

  return (
    <div class="grid justify-center md:justify-normal">
      <ul>
        {data.map((legislationObj, index) =>
          // Create rows.
          renderLegislationRow(legislationObj, index)
        )}
      </ul>
    </div>
  );
};

export default LegistlationTable;
