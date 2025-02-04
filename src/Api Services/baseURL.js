import axios from 'axios';
import { SERVER_URL } from './serverUrl';

const instance = axios.create({
  baseURL: `${SERVER_URL}/`,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  },
});
export default instance;
