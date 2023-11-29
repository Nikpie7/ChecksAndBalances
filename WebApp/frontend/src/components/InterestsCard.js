import React, { useState } from "react";
import { MdOutlineRadioButtonChecked, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const InterestsCard = () => {
  const navigate = useNavigate();
  const [interests, setInterests] = useState([
    {"InterestName": "Agriculture", "value": false},
    {"InterestName": "Spending", "value": false},
    {"InterestName": "Military & National Defense", "value": false},
    {"InterestName": "Veterans", "value": false},
    {"InterestName": "Taxation", "value": false},
    {"InterestName": "Finance", "value": false},
    {"InterestName": "Education", "value": false},
    {"InterestName": "Labor", "value": false},
    {"InterestName": "Energy", "value": false},
    {"InterestName": "Science & Technology", "value": false},
    {"InterestName": "Governmental Reform", "value": false},
    {"InterestName": "Foreign Affairs", "value": false},
    {"InterestName": "Infrastructure", "value": false},
    {"InterestName": "Health", "value": false}
  ]);
  const numActiveInterests = interests.reduce((num, interest) => num += interest.value ? 1 : 0, 0) ?? 0;
  const allowContinue = numActiveInterests >= 2;

  const toggleInterest = (interestName) => {
    const index = interests.findIndex(interest => interest.InterestName === interestName);
    const newValue = !interests[index].value;
    setInterests([
      ...interests.slice(0, index),
      {"InterestName": interestName, "value": newValue},
      ...interests.slice(index + 1)
    ]);
  }

  const handleSubmit = () => {
    navigate('/createAccount');
  };

  return (
    <div className={`w-[30rem] p-8 shadow-lg bg-white rounded-xl`}>
      <h2 className="font-semibold text-2xl">Select your interests</h2>
      <p>Choose at least two interests</p>
      <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-300" />
      <div className="flex flex-wrap gap-3">
        {
          interests.map(interest => {
            return <InterestItem
              interest={interest}
              toggled={interest.value}
              toggleInterest={toggleInterest}
              key={interest.InterestName}
            />;
          })
        }
      </div>
      <div className="flex justify-end">
        <button
          className={`w-max text-lg font-semibold px-6 py-2 mt-4 rounded-lg focus:outline-none ${allowContinue ? 'text-white bg-blue-500 hover:bg-blue-600' : 'bg-white hover:cursor-not-allowed'}`}
          onClick={allowContinue ? handleSubmit : null}
        >
          {allowContinue ? 'Continue' : `Please select ${2 - numActiveInterests} more interest${2 - numActiveInterests === 1 ? '' : 's'}`}
        </button>
      </div>
    </div>
  );
};

const InterestItem = ({interest, toggled, toggleInterest}) => {
  const toggleStyle = toggled
    ? 'bg-green-500 text-white'
    : 'bg-gray-100';
  return (
    <span
      className={`flex items-center font-semibold text-lg w-max h-min shadow-sm p-2 gap-2 rounded-lg cursor-pointer ${toggleStyle}`}
      onClick={() => toggleInterest(interest.InterestName)}
    >
      {
        interest.value
        ? <MdOutlineRadioButtonChecked />
        : <MdOutlineRadioButtonUnchecked />
      }
      {interest.InterestName}
    </span>
  );
};

export default InterestsCard;