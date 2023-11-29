import { React, useState } from "react";
import { useQuery } from "react-query";
import "./SideBar.css";

import dashboardService from "../utils/dashboardService.js";
import LoadingWheel from "./LoadingWheel.js";

// ONLY FOR TESTING. REMOVE!
const USER_TOKEN = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjY4Mjk1OWFmZGY5ODc5NDljY2NmZSIsImZpcnN0TmFtZSI6IlRlc3QyIiwibGFzdE5hbWUiOiJUZXN0MiIsInBhc3N3b3JkIjoiIVRlc3QxMjMiLCJlbWFpbCI6IlRlc3RlcjJAdGVzdC5jb20iLCJhZGRyZXNzIjoiNDAwMCBDZW50cmFsIEZsb3JpZGEgQmx2ZC4gT3JsYW5kbywgRkwgMzI4MTYiLCJpYXQiOjE3MDExMTEwMTksImV4cCI6MTcwMTE5NzQxOX0.iKI-ltuvV0Fb5F68UvBdW5rt72HjM_N9FhI8yHwkXHk",
};

const SideBar = () => {
  // Get Representatives.
  const {
    data: reps,
    isLoading,
    isError,
  } = useQuery(["repsData", USER_TOKEN], () =>
    dashboardService.postGetReps(USER_TOKEN)
  );

  // TODO: Add custom animations.
  if (isLoading) return <LoadingWheel />;
  if (isError) return <p>Error...</p>;

  // TODO: Remove middle initial if it exists.

  if (reps === undefined) {
    return <p>Unable to load your polticians</p>;
  }

  return (
    <div id="SideBar" className="">
      <PoliticianName politician={reps.Senator1} title="Senator" />
      <PoliticianName politician={reps.Senator2} title="Senator" />
      <PoliticianName politician={reps.Representative} title="Representative" />
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
  );
};

const EditInterests = () => {};

export default SideBar;
