import axios from 'axios';

const axiosHost2 = axios.create({
    baseURL: process.env.REACT_APP_HOST_2,
    headers: {
        'content-type': 'application/json',
    }
});

axiosHost2.interceptors.request.use(async (config) => {
    // Handle token here...
    return config;
})

axiosHost2.interceptors.response.use((response) => {
    if (response && response.data) {
        return response;
    }
    return response;
}, (error) => {
    // Handle error 
    return error.response
});

export default axiosHost2;