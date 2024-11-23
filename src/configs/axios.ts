import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

if (!baseURL) {
    throw new Error('REACT_APP_API_URL is not set');
}

const api = axios.create({
    baseURL: baseURL
});

export default api;
