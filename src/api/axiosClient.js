import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://socook.herokuapp.com",
  headers: {
    "content-type": "application/json",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  // Handle token here...
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    // Handle error
    return error.response;
  }
);

export default axiosClient;
