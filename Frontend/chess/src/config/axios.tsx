import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://100.48.100.255:3000",
  withCredentials: true,
});