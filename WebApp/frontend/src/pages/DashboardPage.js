import React, { useState, createContext } from "react";

import NavBar from "../components/NavBar.js";
import InterestBillList from "../components/billList/InterestBillList.js";
import RepBillList from "../components/billList/RepBillList.js";
import SideBar from "../components/SideBar.js";
import WelcomeMessage from "../components/WelcomeMessage.js";
import BillModal from "../components/BillModal.js";

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
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [clickedBillData, setClickedBillData] = useState(initialBillModalData);

  const [billTableToggle, setBillTableToggle] = useState("interests");

  const handleOpenBillModal = () => {
    setIsBillModalOpen(true);
  };

  const handleCloseBillModal = () => {
    setIsBillModalOpen(false);
  };

  return (
    <div className="h-screen">
      {/* <NavBar /> */}
      {/* Outer div holding side bar and table */}
      <div className="grid grid-cols-8 grid-rows-8 lg:grid-cols-4 h-full">
        <div className="col-start-1 col-end-2 row-start-2 row-end-9">
          <SideBar />
        </div>
        <div className="hidden lg:row-start-1 lg:mt-4 lg:block lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-9">
          <WelcomeMessage />
        </div>

        <div className="col-start-3 mt-4 col-span-2 lg:justify-start lg:mr-20">
          <BillListTab setBillTableToggle={setBillTableToggle} />
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
          isOpen={isBillModalOpen}
          onClose={handleCloseBillModal}
          billData={clickedBillData}
        />
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
        <div >
            <input type="radio" name="option" id="Interests" value="Interests" className="peer hidden" onClick={handleInterestsToggle} checked/>
            <label for="Interests" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Interests</label>
        </div>

        <div >
            <input type="radio" name="option" id="Reps" value="Reps" className="peer hidden" onClick={handleRepsToggle} />
            <label for="Reps" className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">Reps</label>
        </div>
    </div>





    // <div className="w-2/3">
    //   <div className="relative right-0">
    //     <ul
    //       className="relative flex list-none flex-wrap rounded-xl bg-blue-gray-50/60 p-1"
    //       data-tabs="tabs"
    //     >
    //       {/* Interests toggle */}
    //       <li
    //         className="z-30 flex-auto text-center"
    //         onClick={handleInterestsToggle}
    //       >
    //         <a
    //           className="text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
    //           data-tab-target=""
    //           role="tab"
    //           aria-selected="true"
    //           href="#top"
    //         >
    //           <InterestsSvg className/>
    //           <span className="ml-1">Interests</span>
    //         </a>
    //       </li>
    //       {/* Reps toggle */}
    //       <li className="z-30 flex-auto text-center" onClick={handleRepsToggle}>
    //         <a
    //           className="text-slate-700 z-30 mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg border-0 bg-inherit px-0 py-1 transition-all ease-in-out"
    //           data-tab-target=""
    //           role="tab"
    //           aria-selected="false"
    //           href="#top"
    //         >
    //           <RepsSvg />
    //           <span className="ml-1">Reps</span>
    //         </a>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
  );
};

export default DashboardPage;
