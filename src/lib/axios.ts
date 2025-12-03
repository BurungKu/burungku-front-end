import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_URL,
  headers: {
    "x-api-key": import.meta.env.VITE_STATIC_API_KEY,
  },
});

export default axiosInstance;
