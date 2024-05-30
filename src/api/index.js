import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-bank-project.eapi.joincoded.com",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `bearer ${token}`;
  }
  return config;
});

export default instance;
