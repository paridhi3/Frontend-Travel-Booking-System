// axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://travelbookingsystem-production.up.railway.app/api', // 🔗 point to Railway backend
});

export default api;
