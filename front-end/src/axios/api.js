
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  Accept: 'application/json',
  // // Change to your Laravel API URL
  // You can add headers here if needed, e.g. Authorization
});

export default api;



