const USER = 'user';
const REGISTER = 'register';
const CAR = 'car';
const TOTAL = 'total';

export const setUser = (data) => localStorage.setItem(USER, JSON.stringify(data));

export const setRegister = (data) => localStorage.setItem(REGISTER, JSON.stringify(data));

export const getUser = () => JSON.parse(localStorage.getItem(USER));

export const removeUser = () => localStorage.removeItem(USER);

export const setCar = (data) => localStorage.setItem(CAR, JSON.stringify(data));

export const getCar = () => {
  if (localStorage.getItem(CAR)) {
    return JSON.parse(localStorage.getItem(CAR));
  }
  return [];
};

export const setTotalCar = (data) => localStorage.setItem(TOTAL, JSON.stringify(data));

export const getTotalCarLocal = () => {
  if (getCar()) {
    let totale = 0;
    getCar().forEach((item) => {
      totale += item.price;
    });
    return totale.toFixed(2);
  }
};

export const quantityFilterLocal = (name) => getCar()
  .filter((localItem) => localItem.name === name).length;
