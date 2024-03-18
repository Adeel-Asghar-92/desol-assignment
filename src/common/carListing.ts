import {
  errorLogger,
  requestLogger,
  responseLogger,
} from "../lib/axios-logger";
import _axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// axios instance for orders
const axios = _axios.create({
  // baseURL: process.env.AUTH_API_URL,
  // baseURL: "http://localhost:8000/api/auth",
  baseURL: "https://desol-backend-assign.vercel.app/api/carListing",
});

axios.interceptors.request.use(requestLogger, errorLogger);
axios.interceptors.response.use(responseLogger, errorLogger);

// Function to make requests for orders
const carListing = async <TData = any, TError = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<TData>> => {
  try {
    console.log("process.env.ORDER_API_URL", process.env);

    const response = await axios.request<TData>(config);
    console.log("response", response);
    return response;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error", error.message);
    }
    throw error;
  }
};

export default carListing;
