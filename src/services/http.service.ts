import axios from 'axios';
import { URL_API } from '../constant';

const http = axios.create({
  baseURL: `${URL_API}v1`,
  timeout: 99999,
});

// Add an interceptor to include the Access-Control-Allow-Origin header
http.interceptors.request.use(config => {
  // Retrieve the _auth cookie value
  const authCookie = document.cookie.match('(^|;)\\s*_auth\\s*=\\s*([^;]+)');

  // Set the Authorization header if the _auth cookie exists
  if (authCookie) {
    config.headers['Authorization'] = `Bearer ${authCookie[2]}`;
  }

  return config;
});

// Add an error interceptor to display an alert with the error message
http.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      alert(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      alert(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      alert(error.message);
    }

    return Promise.reject(error);
  },
);

export default http;
