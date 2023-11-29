import React, { useRef, useEffect, useState } from "react";
import { useQuery, useLazyQuery } from "react-query";

import SearchBarModal from "./SearchBarModal.js";
import dashboardService from "../../utils/dashboardService.js";
import LoadingWheel from "../LoadingWheel.js";

const FloatingSearchBar = ({
  isOpen,
  onClose,
  searchResults,
  setSearchResults,
  setBillModalOpen,
  setClickedBillData,
}) => {
  const [input, setInput] = useState("");

  // const {
  //   data: userResults,
  //   isLoading,
  //   isError,
  // } = useQuery(["userSearchData", input], () => {
  //     console.log(input);
  //     if (!input)
  //       return [];
  //     const results = dashboardService.postSearchBillsBasic({ input: input })
  //     console.log(results);
  //     return [];
  //   }
  // );

  const handleSubmit = async e => {
    e.preventDefault();
    // const value = e.target.value
    // setInput(value);
    const userResults = await dashboardService.postSearchBillsBasic({ input: input })

    // if (isLoading) return <LoadingWheel />;
    // if (isError) return <p>Error...</p>;

    if (userResults === undefined) return;

    if (userResults.length === 0) return;
    console.log(userResults.data.response)
    setSearchResults(userResults.data.response);
    onClose();
  };

  return (
    <div>
    <SearchBarModal isOpen={isOpen} onClose={onClose}>
      <div className="">
        <form onSubmit={handleSubmit}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search Bills
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search bills..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
            
          </div>
        </form>
      </div>
      
    </SearchBarModal>
  </div>

  );
};

export default FloatingSearchBar;
