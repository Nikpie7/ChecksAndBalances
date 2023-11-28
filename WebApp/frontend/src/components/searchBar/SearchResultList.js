import React, { useRef, useEffect, useState } from "react";
import { useQuery } from "react-query";

import SearchBarModal from "./SearchBarModal.js";
import dashboardService from "../../utils/dashboardService.js";
import LoadingWheel from "../LoadingWheel.js";

const SearchResultList = ({ searchResults, setClickedBillData }) => {
  return (
    <div className=""  setClickedBillData={setClickedBillData}>
      {searchResults.map((result) => {
        return <SearchResult result={result} key={result._id} />;
      })}
    </div>
  );
};

const SearchResult = ({result, setClickedBillData}) => {
  
  const handleResultClick = () => {
    setClickedBillData(result);
  };
  
    return (
    <div
    className="shadow-2xl p-4 m-8 rounded-lg hover:scale-105 duration-300"
      onClick={handleResultClick}
    >
        <h1 className="md:text-lg line-clamp-2 xl:line-clamp-1">
          <b>{result.Title}</b>
        </h1>
        <h2>
          {result.BillType.toUpperCase()}.{result.BillNumber}
        </h2>
      
    </div>
  );
};

export default SearchResultList;
