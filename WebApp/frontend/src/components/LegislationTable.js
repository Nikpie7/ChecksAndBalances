import { render } from "@testing-library/react";
import { React, useState } from "react";

// Test data
const legislationList = [
  {
    legislation: "Legislation 1",
    proposer: "Politician 1",
  },
  {
    legislation: "Legislation 2",
    proposer: "Politician 2",
  },
  {
    legislation: "Legislation 3",
    proposer: "Politician 3",
  },
];

const LegistlationTable = () => {
  return (
    <div>
      {/* LegistlationList */}
      <LegistlationList data={legislationList} />
    </div>
  );
};

const LegistlationList = (props) => {
  const data = props.data;

  // Render the row for each piece of legislation.
  const renderLegislationRow = (legislationObj, index) => {
    return (
      <li key={index}>
        <h1>{legislationObj.legislation}</h1>
        <h2>{legislationObj.proposer}</h2>
      </li>
    );
  };

  return (
    <div>
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
