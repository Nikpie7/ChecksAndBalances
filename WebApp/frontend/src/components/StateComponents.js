import { useState } from "react";
import stateJson from '../assets/geoJSON/cb_2022_us_state_5m.json';
import districtJson from '../assets/geoJSON/cb_2022_us_cd118_5m.json';
import { useNavigate } from "react-router-dom";

const StateFlag = ({stateId}) => {
  if (stateId === null)
    return null;
  const stateName = stateJson.features[stateId].properties.NAME;
  return (
    <img className="h-full shadow-md" src={`/flags/${stateName}.svg`} />
  );
};

const StateHeader = ({className, state, district}) => {
  const ordinal_suffix_of = i => { var j = i % 10, k = i % 100; if (j == 1 && k != 11) { return i + "st"; } if (j == 2 && k != 12) { return i + "nd"; } if (j == 3 && k != 13) { return i + "rd"; } return i + "th"; }
  const districtName =
    district === 0 ? 'Congressional District At Large'
    : district > 0 ? `${ordinal_suffix_of(+district)} Congressional District`
    : '';
  return (
    <span className={`w-max flex justify-center items-center h-[10vh] gap-5 ${className}`}>
      <StateFlag stateId={state} />
      <h2 className="text-4xl font-semibold">{stateJson.features[state].properties.NAME}</h2>
      {district !== null ? <h3 className="text-3xl">{districtName}</h3> : null }
    </span>
  )
};

const StateDropdown = ({state, setState}) => {
  const navigate = useNavigate();
  const onSelect = e => {
    setState(e.target.value ?? null);
    navigate('/district');
  };
  return (<span className="w-full flex justify-center gap-3 h-[10vh] p-2">
    <StateFlag stateId={state} />
    <select name="state" id="state" value={state ?? ''} onChange={onSelect} className="p-3 text-2xl border-blue-600 hover:border rounded-lg">
      <option value="" defaultValue>Click on a state on the map, or select from this dropdown</option>
      <option value="0">Alabama</option>
      <option value="1">Alaska</option>
      <option value="2">Arizona</option>
      <option value="3">Arkansas</option>
      <option value="4">California</option>
      <option value="5">Colorado</option>
      <option value="6">Connecticut</option>
      <option value="7">Delaware</option>
      <option value="8">District of Columbia</option>
      <option value="9">Florida</option>
      <option value="10">Georgia</option>
      <option value="11">Hawaii</option>
      <option value="12">Idaho</option>
      <option value="13">Illinois</option>
      <option value="14">Indiana</option>
      <option value="15">Iowa</option>
      <option value="16">Kansas</option>
      <option value="17">Kentucky</option>
      <option value="18">Louisiana</option>
      <option value="19">Maine</option>
      <option value="20">Maryland</option>
      <option value="21">Massachusetts</option>
      <option value="22">Michigan</option>
      <option value="23">Minnesota</option>
      <option value="24">Mississippi</option>
      <option value="25">Missouri</option>
      <option value="26">Montana</option>
      <option value="27">Nebraska</option>
      <option value="28">Nevada</option>
      <option value="29">New Hampshire</option>
      <option value="30">New Jersey</option>
      <option value="31">New Mexico</option>
      <option value="32">New York</option>
      <option value="33">North Carolina</option>
      <option value="34">North Dakota</option>
      <option value="35">Ohio</option>
      <option value="36">Oklahoma</option>
      <option value="37">Oregon</option>
      <option value="38">Pennsylvania</option>
      <option value="39">Rhode Island</option>
      <option value="40">South Carolina</option>
      <option value="41">South Dakota</option>
      <option value="42">Tennessee</option>
      <option value="43">Texas</option>
      <option value="44">Utah</option>
      <option value="45">Vermont</option>
      <option value="46">Virginia</option>
      <option value="47">Washington</option>
      <option value="48">West Virginia</option>
      <option value="49">Wisconsin</option>
      <option value="50">Wyoming</option>
    </select>
  </span>);
};

export { StateDropdown, StateHeader };