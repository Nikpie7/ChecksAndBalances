import React, { useState, createContext } from "react";

import InterestBillList from "../components/billList/InterestBillList.js";
import RepBillList from "../components/billList/RepBillList.js";
import SideBar from "../components/SideBar.js";
import WelcomeMessage from "../components/WelcomeMessage.js";
import BillModal from "../components/BillModal.js";
import SearchIcon from "../components/searchBar/SearchIcon.js";
import FloatingSearchBar from "../components/searchBar/FloatingSearchBar.js";
import SearchResultList from "../components/searchBar/SearchResultList.js";

// SVGs.
import { ReactComponent as RepsSvg } from "../assets/reps_tab_icon.svg";
import { ReactComponent as InterestsSvg } from "../assets/interests_tab_icon.svg";

// Hold initial empty state of modal.
const initialBillModalData = {
  id: "",
  title: "",
  billType: "",
  billNumber: "",
  congressNum: -1,
  lastUpdated: "",
  committee: "",
  relatedInterest: "",
  sponsor: "",
  cosponsors: [],
  summary: "",
  accessVotes: {
    democrat: -1,
    republican: -1,
    independent: -1,
  },
  subject: "",
  billAmendments: [],
  billActions: "",
};

const DashboardPage = () => {
  // Bill modal with detailed info.
  const [billModalOpen, setBillModalOpen] = useState(false);
  const [clickedBillData, setClickedBillData] = useState(initialBillModalData);

  // Bill list.
  const [billTableToggle, setBillTableToggle] = useState("interests");

  // Searching.
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const handleOpenBillModal = () => {
    setBillModalOpen(true);
  };

  const handleCloseBillModal = () => {
    setBillModalOpen(false);
  };

  const handleOpenSearchBar = () => {
    setSearchBarOpen(true);
  };

  const handleCloseSearchBar = () => {
    setSearchBarOpen(false);
  };

  return (
    <div className="h-screen">
      {/* <NavBar /> */}
      {/* Outer div holding side bar and table */}
      <div className="grid grid-cols-8 grid-rows-8 lg:grid-cols-4 h-full">
        <div className="lg:col-start-1 lg:col-end-2 row-start-1 row-end-2 m-2 lg:m-2">
          <SearchIcon setSearchBarOpen={setSearchBarOpen} />
        </div>

        <div className="col-start-3 col-span-5 lg:col-start-3 lg:col-span-2 justify-center lg:justify-start mt-4 lg:mr-20">
          <BillListTab setBillTableToggle={setBillTableToggle} />
        </div>

        <div className="col-start-1 col-end-2 row-start-2 row-end-9">
          <SideBar />
        </div>
        <div className="hidden lg:row-start-1 lg:mt-4 lg:block lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-9">
          <WelcomeMessage />
        </div>

        <div className="col-start-2 col-end-9 row-start-2 row-end-9 lg:col-start-3 lg:col-span-4 overflow-y-auto lg:mb-10 lg:mr-20">
          {billTableToggle === "interests" && (
            <InterestBillList
              clickedBillData={clickedBillData}
              setClickedBillData={setClickedBillData}
              handleOpenBillModal={handleOpenBillModal}
            />
          )}
          {billTableToggle === "reps" && (
            <RepBillList
              clickedBillData={clickedBillData}
              setClickedBillData={setClickedBillData}
              handleOpenBillModal={handleOpenBillModal}
            />
          )}
        </div>

        <BillModal
          isOpen={billModalOpen}
          onClose={handleCloseBillModal}
          billData={clickedBillData}
        />

        <FloatingSearchBar
          isOpen={searchBarOpen}
          onClose={handleCloseSearchBar}
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          setBillModalOpen={setBillModalOpen}
          setClickedBillData={setClickedBillData}
        />
        
          {searchResults && searchResults.length > 0 && (
            <SearchResultList
              setSearchBarOpen={setSearchBarOpen}
              searchResults={searchResults}
              setBillModalOpen={setBillModalOpen}
              setClickedBillData={setClickedBillData}
            />
          )}
        
      </div>
    </div>
  );
};

const BillListTab = ({ setBillTableToggle }) => {
  const handleInterestsToggle = () => {
    setBillTableToggle("interests");
  };

  const handleRepsToggle = () => {
    setBillTableToggle("reps");
  };

  return (
    <div className="grid grid-cols-2 rounded-xl bg-gray-200">
      <div>
        <input
          type="radio"
          name="option"
          id="Interests"
          value="Interests"
          className="peer hidden"
          onClick={handleInterestsToggle}
          // onChange={handleInterestsToggle}
          defaultChecked
        />

        <label
          htmlFor="Interests"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checkeds:font-bold peer-checked:text-white"
        >
          Interests
        </label>
      </div>

      <div>
        <input
          type="radio"
          name="option"
          id="Reps"
          value="Reps"
          className="peer hidden"
          onClick={handleRepsToggle}
          // onChange={handleRepsToggle}
        />
        <label
          htmlFor="Reps"
          className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
        >
          Reps
        </label>
      </div>
    </div>
  );
};

export default DashboardPage;
