import axios from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`,
});

export const requestLogin = (endpoint, body) => api.post(endpoint, body)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const validateLogin = (endpoint, token) => api.post(endpoint, {
  headers: {
    Authorization: token,
  },
});

export const getProducts = (endpoint) => api.get(endpoint);
