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

export const getProducts = (endpoint, token) => api.get(endpoint, {
  headers: {
    Authorization: token,
  },
});

export const requestSale = (endpoint, body, headers) => api
  .post(endpoint, body, headers)
  .then(({ data }) => data)
  .catch((e) => ({ error: e.response.data }));

export const getSellers = () => api.get('/user/sellers');

export const getSeller = (token, id) => api.post(`/customer/orders/${id}`, {
  headers: {
    Authorization: token,
    params: id,
  },
});

export const changeStatus = (token, id) => api.get(`/customer/orders/status/${id}`, {
  headers: {
    Authorization: token,
    params: id,
  },
});

export const getSalles = (token, id) => api.post('/customer/orders', {
  headers: {
    Authorization: token,
    params: id,
  },
});
