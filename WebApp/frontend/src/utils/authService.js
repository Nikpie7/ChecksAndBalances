import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://checksnbalances.us";

const postLogin = (request) => {
  return axios
    .post(`${baseUrl}/api/login`, request)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const postRegister = (request) => {
  return axios
    .post(`${baseUrl}/api/register`, request)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const postSendPasswordReset = (request) => {
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

const postPasswordReset = (request) => {
  return axios
    .get(`${baseUrl}/api/password-reset`, {
      params: {
        token: request.token,
        newPassword: request.newPassword
      }
    })
    .then((response) => {
      console.log(response);
      return response.data;
      // setTimeout(() => history.push('/login'), 3000); // Uncomment if you want to redirect after reset
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { postLogin, postRegister, postPasswordReset, postSendPasswordReset };
