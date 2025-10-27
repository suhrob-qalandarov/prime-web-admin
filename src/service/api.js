import axios from 'axios'
import urls from '../../src/constants/urls';

// Base settings
axios.defaults.baseURL = urls.apiBaseUrl;
axios.defaults.withCredentials = true;

// Default Content-Type ni o'chirish (application/json bo'lmasin)
delete axios.defaults.headers.post['Content-Type'];

// FormData yuborilganda Content-Type ni o'chirish
axios.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers['Content-Type'];
    }
    return config;
});

export default axios