import { useState } from "react";
import { MdOutlineArrowBack, MdOutlineHelpOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const HeaderBar = ({props}) => {
  const {left, center, right} = props;
  return (
    <nav className="mx-auto h-[10vh] bg-gray-100 grid grid-cols-3 items-center">
      <div className="justify-self-start">{left}</div>
      <div className="justify-self-center">{center}</div>
      <div className="justify-self-end">{right}</div>
    </nav>
  );
};

const BackButton = ({onClick}) => {
  return (
    <button className="ml-4 flex gap-2 items-center text-2xl font-semibold hover:bg-gray-300 p-2 rounded-lg"
      onClick={onClick}>
      <MdOutlineArrowBack className="text-4xl" />Back
    </button>
  );
};

const ViewTitle = ({info}) => {
  const [popup, setPopup] = useState(null);
  const handleEnter = () => {
    console.log('entered');
    setPopup(
      <div className="absolute font-normal text-base top-16 bg-white shadow-md rounded-sm p-4">
        {info.hover}
      </div>
    );
  };
  const handleLeave = () => {
    console.log('left');
    setPopup(null);
  };
  return (<span className="ml-6 flex gap-2 items-center text-3xl font-semibold">
    <h1 className="w-max">
      {info.header}
    </h1>
    <MdOutlineHelpOutline
      className="text-4xl cursor-help"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    />
    {popup}
  </span>);
};

export { HeaderBar, BackButton, ViewTitle };