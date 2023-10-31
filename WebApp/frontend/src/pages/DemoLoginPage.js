import React from 'react';
import NavBar from '../components/NavBar.js';
import LoginCard from '../components/LoginCard.js';
import RegistrationCard from '../components/RegistrationCard.js';
import art from '../assets/artTrimmed.webp';
import loginBackground from '../assets/loginBackground.webp';


const DemoLoginPage = ({register}) => {
  return (
    <div className="min-w-full min-h-screen panBackground">
      <NavBar />
      <div className="h-[90vh] flex">
        <div className="w-7/12 flex justify-center items-center">
          <img src={art} className="object-cover h-3/4 w-11/12 ml-auto"/>
        </div>
        <div className="w-5/12 flex justify-center items-center">
          {
            register
            ? <RegistrationCard />
            : <LoginCard />
          }
        </div>
      </div>
    </div>
  );
};

export default DemoLoginPage;
