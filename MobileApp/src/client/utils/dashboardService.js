/* eslint-disable prettier/prettier */
import axios from 'axios';

const baseURL = 'https://checksnbalances.us';
    // process.env.NODE_ENV === "development"
    // ? "http://localhost:5001"
    // : "https://checksnbalances.us";

const getGetUser = (request) => {
  console.log('reading interests');
  return axios
    .get(`${baseURL}/api/getUser`, {
      params: {
        token: request.token,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log('error :(');
      console.log(error);
    });
};

const getReadInterests = (request) => {
  console.log('reading interests');
  return axios
    .get(`${baseURL}/api/readInterests`, {
      params: {
        token: request.token,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log('error :(');
      console.log(error);
    });
};

const getGetBillsByInterests = (request) => {
  return axios
    .get(`${baseURL}/api/getBillsByInterest`, {
      params: {
        interest: request.interestName,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getGetBillTitles = (request) => {
  return axios
    .get(`${baseURL}/api/getBillTitles`, {
      params: {
        congress: request.congress,
        billType: request.billType,
        billNumber: request.billNumber,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getGetBillCommittees = (request) => {
  return axios
    .get(`${baseURL}/api/getBillCommittees`, {
      params: {
        congress: request.congress,
        billType: request.billType,
        billNumber: request.billNumber,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getGetBillSummaries = (request) => {
  return axios
    .get(`${baseURL}/api/getBillSummaries`, {
      params: {
        congress: request.congress,
        billType: request.billType,
        billNumber: request.billNumber,
      },
    })
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const postSearchBillsByInterest = (request) => {
  return axios
    .post(`${baseURL}/api/searchBillsByInterest`, request)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const postGetReps = (request) => {
  return axios
    .post(`${baseURL}/api/getReps`, request)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

// const postSearchBillsSponsors = (request) => {
//   return axios
//     .post(`${baseURL}/api/searchBillsSponsors`, request)
//     .then((response) => {
//       console.log(response);
//       return response.data;
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

export default {
    getReadInterests,
    getGetBillsByInterests,
    getGetBillTitles,
    getGetBillCommittees,
    getGetBillSummaries,
    postSearchBillsByInterest,
    postGetReps,
    // postSearchBillsSponsors,
};
