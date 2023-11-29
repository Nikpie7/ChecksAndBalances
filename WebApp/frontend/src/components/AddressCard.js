import { geocodeAddress, getDistrict, predictAddress, getPlaceDetails } from "../utils/onboardingService";
import Card from "./Card";
import stateJSON from '../assets/geoJSON/cb_2022_us_state_5m.json';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {centerOfMass} from '@turf/turf';

const AddressCard = ({userData, setUserData}) => {
  const state = userData.state;
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
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
    setErrorMessage('');
    if (submitted)
      handleSubmit();
  }, [address]);

  const handleSubmit = () => {
    if (address === '')
      return;
    const stateName = stateJSON.features[state].properties.NAME;
    const stateAbb = stateJSON.features[state].properties.STUSPS;

    geocodeAddress(address, stateName)
      .then(async response => {
        const placeDetails = await getPlaceDetails(response.place_id);
        const isAddressInState = placeDetails.address_components.reduce((containsState, component) => {
          if (component.types.includes('administrative_area_level_1')) {
            containsState = component.long_name.localeCompare(stateName) === 0 || component.short_name.localeCompare(stateAbb) === 0;
            console.log(component.long_name, stateName);
            // console.log('containsState is ', containsState);
          }
          return containsState;
        }, false);
        if (!isAddressInState) {
          setErrorMessage(`Address is not in ${stateName}`);
          // console.log('RETURNING');
          return;
        }
        console.log(response.geometry.coords);
        const district = (await getDistrict(response.geometry.coords)).fields.congressional_districts[0].district_number;
        setUserData({
          ...userData,
          address,
          district,
          coords: response.geometry.coords
        });
        navigate('/interests');
      })
      .catch(error => {
        console.log(error)
      });
  };

  const onInputFocus = focused => { setTimeout(() => { setInputFocused(focused); }, 100) };

  return (
    <Card className="w-5/6">
      <h2 className="font-semibold text-2xl">Enter your street address</h2>
      <input placeholder="123 Address Street" type="text" autoComplete="off" data-1p-ignore className={`h-12 w-full border-2 rounded-lg p-3 mt-6 ${errorMessage === '' ? '' : 'border-red-600'}`} value={address} onChange={e => setAddress(e.target.value)} onFocus={() => onInputFocus(true)} onBlur={() => onInputFocus(false)} />
      {inputFocused ? <PlacePredictionList predictions={predictions} handleSelect={selectedAddress => {setAddress(selectedAddress); setSubmitted(true);}} /> : null}
      <p className="text-red-500 pt-2">{errorMessage}</p>
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