
import axios from 'axios';

const baseURL = 'http://localhost:8001';
// ticket: LtJuwpkK.03wY83zUhoPgJtWqCyXnOTnLPYKoshrb
// empty: VjPvqpdT.Ufe8ne54a3MB0I87s4LFqv6Bbs5fLDFb

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