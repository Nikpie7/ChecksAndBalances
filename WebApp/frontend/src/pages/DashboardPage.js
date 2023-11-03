import React from 'react';

import NavBar from '../components/NavBar.js';
import LegistlationTable from '../components/LegislationTable.js';
import SideBar from '../components/SideBar.js'

const DashboardPage = () =>
{

    return(
      <div>
        <NavBar />
        {/* SideBar */}
        <div>
          <SideBar />
        </div>

        {/* LegislationTable */}
        <div>
          <LegistlationTable />
        </div>
        
      </div>
    );
};

export default DashboardPage;

