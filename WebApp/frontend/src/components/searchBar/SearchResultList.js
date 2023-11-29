import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "react-query";

import SearchBarModal from "./SearchBarModal.js";
import dashboardService from "../../utils/dashboardService.js";
import LoadingWheel from "../LoadingWheel.js";

const SearchResultList = ({ searchResults, setBillModalOpen, setClickedBillData }) => {
  return (
    <div className="" setBillModalOpen={setBillModalOpen} setClickedBillData={setClickedBillData}>
      {searchResults.map((result) => {
        return <SearchResult result={result} key={result._id} />;
      })}
    </div>
  );
};

const SearchResult = ({result, setBillModalOpen, setClickedBillData}) => {
  
  const handleResultClick = () => {
    setBillModalOpen(true);
    setClickedBillData(result);
  };
  
    return (
    <div
      className=""
      onClick={handleResultClick}
    >
        <div>
      {result.Title}
      </div>
    </div>
  );
};

export default SearchResultList;
