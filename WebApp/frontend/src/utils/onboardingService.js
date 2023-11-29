import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5001'
  : 'https://checksnbalances.us';

const geocodeAddress = async (address, state) => {
  const queryObj = {
    params: { address, state }
  };
  try {
    const response = await axios.get(`${baseUrl}/api/geocode`, queryObj);
    return response.data;
  }
  catch {
    return null;
  }
};

const predictAddress = async (address, state, stateOrigin) => {
  const queryObj = {
    params: { address, state, stateOrigin }
  };
  try {
    const response = await axios.get(`${baseUrl}/api/predictAddress`, queryObj);
    if (response.data === '')
      return [];
    return response.data;
  }
  catch {
    return null;
  }
};

const getDistrict = async coords => {
  const queryObj = {
    params: { coords }
  }
  const response = await axios.get(`${baseUrl}/api/getDistrict`, queryObj);
  // console.log(response.data);
  return response.data;
};

const getPlaceDetails = async place_id => {
  const queryObj = {
    params: { place_id }
  }
  const response = await axios.get(`${baseUrl}/api/getPlaceDetails`, queryObj);
  console.log(response.data);
  return response.data;
};

const getSenators = async (state) => {
  const stateInitals = state.toLowerCase();
  try {
    const response = await axios.post(`${baseUrl}/api/getSenByState`, { state: stateInitals });
    return response.data.officials;
  }
  catch {
    return null;
  }
};

const updateInterests = async (interests, token) => {
  try {
    const response = await axios.post(`${baseUrl}/api/updateInterests`, { token, interests });
    return response.data;
  }
  catch {
    return null;
  }
};

export { getSenators, predictAddress, geocodeAddress, getDistrict, getPlaceDetails, updateInterests };