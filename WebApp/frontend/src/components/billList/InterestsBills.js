import { render } from "@testing-library/react";
import {
  React,
  createContext,
  useState,
  useEffect,
  useRef,
  useContext,
} from "react";
import { useQuery } from "react-query";

import interestsCategories from "../interestsCategories.json";
import "./BillTable.css";

import dashboardService from "../../utils/dashboardService.js";
import LoadingWheel from "../LoadingWheel.js";

// Define the current Congress.
// Would want to eventually update this to dynamic check
// if we were to further this app.
const CONGRESS_NUM = 118;

// Used to help pass state hooks for bill data down to child component
const MyContext = createContext();

const InterestsBills = ({ USER_TOKEN, setInterests }) => {
  const {
    data: interests,
    isLoading,
    isError,
  } = useQuery(["interestsData", USER_TOKEN], () =>
    dashboardService.getReadInterests(USER_TOKEN)
  );

  if (isLoading) return <LoadingWheel />;
  if (isError) return <p>Error...</p>;

  // TODO: ADD BETTER STYLE IF USER HAS NO INTERESTS
  if (interests === undefined) {
    return <h1>Unable to load interests :(</h1>;
  }

  let userInterestsTemp = [];

  // Iterate through all interests and save ones user follows.
  for (let i = 0; i < interests.Interests.length; i++) {
    if (interests.Interests[i].value) {
      userInterestsTemp.push(interests.Interests[i].InterestName);
    }
  }

  if (userInterestsTemp.length === 0) {
    return <h1>You have not interests. You should add some :)</h1>;
  }

  


};
