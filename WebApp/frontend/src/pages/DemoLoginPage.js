import React from 'react';
import NavBar from '../components/NavBar.js';
import LoginCard from '../components/LoginCard.js';
import RegistrationCard from '../components/RegistrationCard.js';
import map from '../assets/tempMap.png';
import art from '../assets/art.webp';

const DemoLoginPage = ({register}) => {
  console.log(register)
  return (
    <div className="min-w-full min-h-screen">
      <NavBar />
      <div className="h-[90vh] flex bg-gradient-to-br from-blue-700 via-white to-red-600">
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