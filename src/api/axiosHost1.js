import axios from 'axios';

const axiosHost1 = axios.create({
    baseURL: process.env.REACT_APP_HOST_1,
    headers: {
        'content-type': 'application/json',
    }
});

axiosHost1.interceptors.request.use(async (config) => {
    // Handle token here...
    return config;
})

axiosHost1.interceptors.response.use((response) => {
    if (response && response.data) {
        return response;
    }
    return response;
}, (error) => {
    // Handle error 
    return error.response
});

export default axiosHost1;