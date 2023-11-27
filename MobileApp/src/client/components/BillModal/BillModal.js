import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useSelector } from "react-redux";

const BillModal = () => {
  // Get the current display bill store in redux store.
  //const displayBill = useSelector((state) => state.displayBill);
  const [displayBill, setDisplayBill] = useState(false);

  const openBill = () => {
    setDisplayBill(true);
  };

  return (
    <View>
      {/* <button onClick={openBill}>Open Dialog</button> */}
      {displayBill && (<Alert hidden={displayBill}>This is test modal</Alert>)}
    </View>
  );
};

export default BillModal;