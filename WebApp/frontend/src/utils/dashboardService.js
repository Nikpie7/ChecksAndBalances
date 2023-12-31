import axios from "axios";
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : "https://checksnbalances.us";

const getReadInterests = (request) => {
  return axios
    .get(`${baseUrl}/api/readInterests`, {
      params: {
        token: request.token,
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

const getGetBillsByInterests = (request) => {
  return axios
    .get(`${baseUrl}/api/getBillsByInterest`, {
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
    .get(`${baseUrl}/api/getBillTitles`, {
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
    .get(`${baseUrl}/api/getBillCommittees`, {
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
    .get(`${baseUrl}/api/getBillSummaries`, {
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
    .post(`${baseUrl}/api/searchBillsByInterest`, request)
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
    .post(`${baseUrl}/api/getReps`, request)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const postSearchBillsSponsors = (request) => {
  return axios
    .post(`${baseUrl}/api/searchBillsSponsors`, request)
    .then((response) => {
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

const postSearchBillsBasic = async (request) => {
  console.log(request);
  try {
    const results = await axios.post(`${baseUrl}/api/searchBillsBasic`, request);
    return results;
  }
  catch {
    console.log('postSearchBillsBasic failed');
    return null;
  }
};


export default {
  getReadInterests,
  getGetBillsByInterests,
  getGetBillTitles,
  getGetBillCommittees,
  getGetBillSummaries,
  postSearchBillsByInterest,
  postGetReps,
  postSearchBillsSponsors,
  postSearchBillsBasic
};
