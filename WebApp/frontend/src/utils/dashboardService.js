import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5001'
  : 'https://checksnbalances.us';

const getReadInterests = (request) => {
  return axios.get(`${baseUrl}/api/readInterests`, request)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const getGetBillsByInterests = (request) => {
  return axios.get(`${baseUrl}/api/getBillsByInterest`, request)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const getGetBillTitles = (request) => {
    return axios.get(`${baseUrl}/api/getBillTitles`, request)
      .then(response => {
        console.log(response);
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });
  };



export default { getReadInterests, getGetBillsByInterests};