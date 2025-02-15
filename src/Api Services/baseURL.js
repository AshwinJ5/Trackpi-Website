import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/`,
  timeout: 3000,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
  },
});
export default instance;
