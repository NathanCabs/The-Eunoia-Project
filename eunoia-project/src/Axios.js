import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6543',
});

export default api;