import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-8d34a.firebaseio.com/'
});

export default instance;