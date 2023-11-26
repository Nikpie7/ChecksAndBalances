import React from "react";

import NavBar from "../components/NavBar.js";
import LegistlationTable from "../components/LegislationTable.js";
import SideBar from "../components/SideBar.js";
import WelcomeMessage from "../components/WelcomeMessage.js";

const DashboardPage = () => {
  return (
    <div className="h-screen">
      {/* <NavBar /> */}
      {/* Outer div holding side bar and table */}
      <div className="grid grid-cols-8 lg:grid-cols-4 h-full">
        <div className="col-start-1 col-end-2">
          <SideBar />
        </div>
        <div className="hidden lg:block lg:col-start-2 lg:col-end-3">
          <WelcomeMessage />
        </div>

        <div className="col-start-2 col-end-9 lg:col-start-3 lg:col-span-4 overflow-y-auto lg:my-10 lg:mr-20">
          <LegistlationTable />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
