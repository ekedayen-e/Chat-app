import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3001/';

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true
        const response = await axios.post('http://localhost:3001/refresh', {}, {withCredentials: true});

        if (response.status === 200) {
            console.log("I am here", response.data.accessToken)
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
            return axios(error.config)
        }
    }
    refresh = false;
    return error;
});