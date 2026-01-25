import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error Response:", error.response);
        if (error.response?.status === 401) {
            console.warn("401 Unauthorized detected. Redirecting to login.");
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;