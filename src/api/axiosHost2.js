import axios from 'axios';

const axiosHost2 = axios.create({
    baseURL: 'http://recipeweb-env-1.eba-yjmhmymp.ap-southeast-1.elasticbeanstalk.com',
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