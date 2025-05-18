// axios/axiosInstance.js
import axios from 'axios';

const instanceAxios = axios.create({
  baseURL: 'http://maureljeremy.me/api/v1',
  withCredentials: true,
});

export default instanceAxios;
