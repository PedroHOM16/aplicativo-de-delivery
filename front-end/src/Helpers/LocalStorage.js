const USER = 'user';
const REGISTER = 'register';

export const setUser = (data) => localStorage.setItem(USER, JSON.stringify(data));

export const setRegister = (data) => localStorage.setItem(REGISTER, JSON.stringify(data));

export const getUser = () => JSON.parse(localStorage.getItem(USER));
