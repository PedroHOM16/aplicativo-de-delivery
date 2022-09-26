const USER = 'user';
const REGISTER = 'register';
const CAR = 'car';
const TOTAL = 'total';

export const setUser = (data) => localStorage.setItem(USER, JSON.stringify(data));

export const setRegister = (data) => localStorage.setItem(REGISTER, JSON.stringify(data));

export const getUser = () => JSON.parse(localStorage.getItem(USER));

export const removeUser = () => localStorage.removeItem(USER);

export const setCar = (data) => localStorage.setItem(CAR, JSON.stringify(data));

export const setTotalCar = (data) => localStorage.setItem(TOTAL, JSON.stringify(data));

export const getTotalCarLocal = (data) => (
  localStorage.getItem(TOTAL, JSON.stringify(data))
);
