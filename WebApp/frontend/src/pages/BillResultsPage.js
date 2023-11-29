import React, { useRef, useEffect, useState } from "react";
import SearchResultList from "../components/searchBar/SearchResultList";

const BillResultsPage = ({searchBarResults, setClickedBillData}) => {
    
    
    
    return (
        <div><SearchResultList searchBarResults={searchBarResults} setClickedBillData={setClickedBillData}/></div>
    );
};