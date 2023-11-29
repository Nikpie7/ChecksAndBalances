import { useState } from "react";

import { ReactComponent as SearchSvg } from "../assets/search_icon.svg";

const SearchIcon = ({setSearchBarOpen}) => {
  
  const searchClickedHandle = () => {
    setSearchBarOpen(true);
  };

  return (
    <div className="grid grid-cols-3">
      <SearchSvg className="col-start-1 col-end-2 hover:cursor-pointer" onClick={searchClickedHandle}/>
      
      <h1 className="hidden lg:block col-start-2 col-end-3 justify-center">Search for bills</h1>
    </div>
  );
};

export default SearchIcon;
