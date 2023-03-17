
import axios from 'axios';

const baseURL = 'http://localhost:8000';
const apikey = 'LtJuwpkK.03wY83zUhoPgJtWqCyXnOTnLPYKoshrb'

const instance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Api-Key ${apikey}`
  }
});

export default instance;