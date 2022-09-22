const TOKEN = 'token';

export const setToken = (data) => {
  localStorage.setItem(TOKEN, data);
};

export const getToken = () => JSON.parse(localStorage.getItem(TOKEN));
