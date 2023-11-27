import React, { useState } from "react";
import { useSelector } from "react-redux";

const BillModal = () => {
  // Get the current display bill store in redux store.
  //const displayBill = useSelector((state) => state.displayBill);
  const [displayBill, setDisplayBill] = useState(false);

  const openBill = () => {
    setDisplayBill(true);
  };

  return (
    <div>
      {/* <button onClick={openBill}>Open Dialog</button> */}
      {displayBill && (<dialog hidden={displayBill}>This is test modal</dialog>)}
    </div>
  );
};

export default BillModal;
