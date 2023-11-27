import { React, useState } from "react";
import { useQuery } from "react-query";
import "./SideBar.css";

import dashboardService from "../utils/dashboardService.js";

// ONLY FOR TESTING. REMOVE!
const ADDRESS = "4000 Central Florida Blvd. Orlando, FL 32816";

const SideBar = () => {
  // Get Representatives.
  const {
    data: reps,
    isLoading,
    isError,
  } = useQuery(["repsData", ADDRESS], () =>
    dashboardService.postGetReps({address: ADDRESS})
  );

  // TODO: Add custom animations.
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error...</p>;

  return (
    <div id="SideBar" className="">
      <PoliticianName politician={reps.Senator1} title="Senator"/>
      <PoliticianName politician={reps.Senator2} title="Senator"/>
      <PoliticianName politician={reps.Representative} title="Representative"/>
    </div>
  );
};

const PoliticianName = (props) => {
  const politician = props.politician;
  const title = props.title;

  return (
    <div>
      <h1>{title}:</h1>
      <h2 className="indent-4">{politician}</h2>
    </div>
  )

};

const EditInterests = () => {

}

export default SideBar;