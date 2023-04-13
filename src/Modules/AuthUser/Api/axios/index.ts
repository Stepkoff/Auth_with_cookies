import Cookies from 'js-cookie';
import axios from "axios";

export const AxiosInstance = axios.create({
  baseURL: 'https://nestjs-boilerplate-test.herokuapp.com/api'
})

AxiosInstance.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get('auth-token');
    if(authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config
  },
  (error) => Promise.reject(error)
);