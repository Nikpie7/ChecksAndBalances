import { geocodeAddress, getDistrict, predictAddress } from "../utils/onboardingService";
import Card from "./Card";
import stateJSON from '../assets/geoJSON/cb_2022_us_state_5m.json';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {centerOfMass} from '@turf/turf';

const AddressCard = ({userData, setUserData}) => {
  const state = userData.state;
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [inputFocused, setInputFocused] = useState(false);

  useEffect(() => {
    const stateAbb = stateJSON.features[state].properties.STUSPS;
    let stateOrigin = [];
    [stateOrigin[1], stateOrigin[0]] = centerOfMass(stateJSON.features[state].geometry).geometry.coordinates;
    predictAddress(address, stateAbb, stateOrigin)
      .then(response => {
        response.filter(prediction => prediction.description !== address)
        setPredictions(response);
      })
      .catch(error => console.log(error));
  }, [address]);

  const handleSubmit = () => {
    if (address === '')
      return;
    const stateName = stateJSON.features[state].properties.NAME;
    geocodeAddress(address, stateName)
      .then(async response => {
        console.log(response);
        const district = await getDistrict(response);
        console.log(district);
        setUserData({
          ...userData,
          address,
          district,
          coords: response
        });
        navigate('/interests');
      })
      .catch(error => console.log(error));
  };

  const onInputFocus = focused => { setTimeout(() => { setInputFocused(focused); }, 100) };

  return (
    <Card className="w-5/6">
      <h2 className="font-semibold text-2xl">Enter your street address</h2>
      <input placeholder="123 Address Street" type="text" autoComplete="off" data-1p-ignore className="h-12 w-full border-2 rounded-lg p-3 mt-6" value={address} onChange={e => setAddress(e.target.value)} onFocus={() => onInputFocus(true)} onBlur={() => onInputFocus(false)} />
      {inputFocused ? <PlacePredictionList predictions={predictions} handleSelect={selectedAddress => setAddress(selectedAddress)} /> : null}
      <div className="flex justify-end">
        <button
          className="w-max font-semibold px-7 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none mt-6"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </Card>
  )
};

const PlacePredictionList = ({predictions, handleSelect}) => {
  return (
    <div className="fixed flex flex-col">
      {predictions.map(prediction => <PlacePrediction prediction={prediction} key={prediction.place_id} handleSelect={handleSelect} />)}
    </div>
  )
};
const PlacePrediction = ({prediction, handleSelect}) => {
  return (
    <span className="p-3 bg-white shadow-lg hover:bg-gray-200 hover:cursor-pointer" onClick={() => handleSelect(prediction.description)}>
      <p>{prediction.description}</p>
    </span>
  )
};

export default AddressCard;