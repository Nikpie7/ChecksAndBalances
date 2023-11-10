import {
  react
} from 'react';
import headerLogo from '../assets/headerLogo.png';
import { MdOutlineInfo } from 'react-icons/md';

const NavBar = () => {
  return (<>
    <nav className="bg-white border-gray-200 fixed w-full z-20 h-[10vh]">
      <a href="./">
        <img src={headerLogo} className="absolute inset-0 h-[90%] mx-auto" />
      </a>
      <span className="flex flex-wrap items-center justify-between h-full mx-auto p-2 shadow-lg">
        <div className="mr-auto flex items-center text-3xl p-4">
          <MdOutlineInfo className="mr-2" />
          <h3 className="font-medium">
            About us
          </h3>
        </div>
        <div className="ml-auto">
        </div>
      </span>
    </nav>
    <div className="h-[10vh]"></div>
  </>);
};

export default NavBar;