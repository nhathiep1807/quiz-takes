import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://dev.admin.screentor.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => config,
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
