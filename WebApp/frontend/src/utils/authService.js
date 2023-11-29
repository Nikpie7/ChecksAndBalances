import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://checksnbalances.us";

const postLogin = async (request) => {
  return await axios.post(`${baseUrl}/api/login`, request);
};

const postRegister = (request) => {
  return axios.post(`${baseUrl}/api/registerWithInterests`, request);
};

const sendResetEmail = (request) => {
  return axios
    .post(`${baseUrl}/api/send-password-reset`, request)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

const resetPassword = async (request) => {
  return await axios
    .get(`${baseUrl}/api/password-reset`, {
      params: {
        token: request.token,
        newPassword: request.newPassword
      }
    });
};

export default { postLogin, postRegister, sendResetEmail, resetPassword };
 
