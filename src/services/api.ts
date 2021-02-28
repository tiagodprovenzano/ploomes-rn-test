import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api2.ploomes.com'
})

export default api;
