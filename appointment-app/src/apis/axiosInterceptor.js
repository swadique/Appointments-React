import axios from "axios";
import storage from "../storage";

const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;

const axiosInterceptor = axios.create({
  headers: {
    Authorization: `Bearer ${storage.authToken.getItem()}`,
  },
  baseURL: `${serverAddress}`,
});

export default axiosInterceptor;
