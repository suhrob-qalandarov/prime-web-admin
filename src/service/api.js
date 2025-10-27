import axios from 'axios';
import urls from '../../src/constants/urls';

// Axios instance yaratamiz
const api = axios.create({
    baseURL: urls.apiBaseUrl,
    withCredentials: true,
});

// Default Content-Type ni o'CHIRISH
delete api.defaults.headers.common['Content-Type'];
delete api.defaults.headers.post['Content-Type'];

// Interceptor — FormData yuborilganda Content-Type ni o'chir
api.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        // Content-Type ni butunlay o'chir — browser avto qo‘shadi
        delete config.headers['Content-Type'];
        delete config.headers['content-type'];
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;