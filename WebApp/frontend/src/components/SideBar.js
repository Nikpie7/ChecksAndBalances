import { React, useState } from "react";
import { useQuery } from "react-query";
import "./SideBar.css";

import dashboardService from "../utils/dashboardService.js";
import LoadingWheel from "./LoadingWheel.js"

// ONLY FOR TESTING. REMOVE!
const ADDRESS = "1105 N Market St, Ste. 400 Wilmington, DE 19801";

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
  if (isLoading) return <LoadingWheel />;
  if (isError) return <p>Error...</p>;

  // TODO: Remove middle initial if it exists.

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