
import axios from 'axios';

const baseURL = 'http://localhost:8000';
// 'LtJuwpkK.03wY83zUhoPgJtWqCyXnOTnLPYKoshrb'

const instance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: ''
  }
});

instance.interceptors.request.use(
  request => {
    request.headers.Authorization = `Api-Key ${window.sessionStorage.getItem('Api-Key')}`;
    return request;
  }, 
  undefined
);

instance.interceptors.response.use(
  undefined, 
  error => {
    return Promise.reject(error);
  }
);

export default instance;