import axios from 'axios';
const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5001'
  : 'http://checksnbalances.us';

const postLogin = (request) => {
  return axios.post(`${baseUrl}/api/login`, request)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

const postRegister = (request) => {
  return axios.post(`${baseUrl}/api/register`, request)
    .then(response => {
      console.log(response);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
};

export default { postLogin, postRegister };