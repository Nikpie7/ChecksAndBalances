import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar.js';
import LoginCard from '../components/LoginCard.js';
import RegistrationCard from '../components/RegistrationCard.js';
import map from '../assets/tempMap.png';
import art from '../assets/art.webp';

const DemoLoginPage = ({ register }) => {
  console.log(register);

  // Define gradient colors in the state
  const [gradientColors, setGradientColors] = useState({
    from: "from-blue-700",
    via: "via-white",
    to: "to-red-600",
  });

  // Use useEffect to update the gradient colors over time
  useEffect(() => {
    const interval = setInterval(() => {
      // You can change this logic to produce a different animation pattern
      setGradientColors((prevColors) => {
        return {
          from: prevColors.to,
          via: prevColors.from,
          to: prevColors.via,
        };
      });
    }, 5000); // Every 5 seconds in this example

    // Clean up the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-w-full min-h-screen">
      <NavBar />
      <div className={`h-[90vh] flex bg-gradient-to-br ${gradientColors.from} ${gradientColors.via} ${gradientColors.to}`}>
        <div className="w-7/12 flex justify-center items-center">
          <img src={art} className="object-cover h-3/4 w-11/12 ml-auto" />
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
