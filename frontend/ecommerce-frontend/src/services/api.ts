import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ⭐ Change 'token' par 'accessToken'
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken'); // ⭐ ICI
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('accessToken'); // ⭐ ET ICI
            localStorage.removeItem('refreshToken'); // ⭐ ET ICI
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;