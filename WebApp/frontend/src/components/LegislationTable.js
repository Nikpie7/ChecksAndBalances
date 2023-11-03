import { render } from "@testing-library/react";
import { React, useState } from "react";

import legislativeBills from "./legislationListTestData";
import "./LegislationTable.css";



const LegistlationTable = () => {
  return (
    <div>
      {/* LegistlationList */}
      <LegistlationList data={legislativeBills} />
    </div>
  );
};

const LegistlationList = (props) => {
  const data = props.data;

  // Render the row for each piece of legislation.
  const renderLegislationRow = (legislationObj, index) => {
    return (
      <div id="legislationList-row"
      class="grid grid-flow-row shadow-2xl p-4 m-8 rounded-lg hover:scale-105 duration-300">
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
