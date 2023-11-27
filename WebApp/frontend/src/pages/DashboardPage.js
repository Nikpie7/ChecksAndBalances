import React, { useState, createContext } from "react";

import NavBar from "../components/NavBar.js";
import BillTable from "../components/BillTable.js";
import SideBar from "../components/SideBar.js";
import WelcomeMessage from "../components/WelcomeMessage.js";
import BillModal from "../components/BillModal.js";

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
        <div className="hidden lg:block lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-9">
          <WelcomeMessage />
        </div>

        <div className="col-start-2 col-end-9 row-start-2 row-end-9 lg:col-start-3 lg:col-span-4 overflow-y-auto lg:my-10 lg:mr-20">
          <BillTable setClickedBillData={setClickedBillData} handleOpenBillModal={handleOpenBillModal}/>
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

export default DashboardPage;
