import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://52.204.95.226:3000",
  withCredentials: true,
});