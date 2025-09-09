import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4001', // URL do seu back-end
});

export default api;
