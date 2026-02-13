import axios from "axios";
import { BASE_URL } from "./baseUrl";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
});

// token agar future me lagana ho
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
