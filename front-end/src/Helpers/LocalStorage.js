const USER = 'user';

export const setUser = (data) => localStorage.setItem(USER, JSON.stringify(data));

export const getUser = () => JSON.parse(localStorage.getItem(USER));
