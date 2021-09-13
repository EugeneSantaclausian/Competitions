import axios from 'axios';

const client = axios.create({
  baseURL: 'https://sidu.herokuapp.com/api',
  headers: {
    Accept: 'application/json',
  },
});

export default client;
