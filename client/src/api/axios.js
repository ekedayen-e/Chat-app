import axios from 'axios';
const BASE_URL = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging' ? 'https://rom-net.onrender.com/' : 'http://localhost:3001';
console.log(BASE_URL)

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});