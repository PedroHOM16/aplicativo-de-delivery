import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getCar } from '../Helpers/LocalStorage';
import '../CSS/Card.css';

function Card({ id, name, price, urlImage, setCarState }) {
  const verifyQuantity = () => {
    const car = getCar();
    const sameItemIndex = car.findIndex((itemCar) => itemCar.name === name);
    const itemCar = car[sameItemIndex];
    if (itemCar) {
      const { quantity } = car[sameItemIndex];
      if (quantity) return quantity;
    }
    return 0;
  };
  const [quantity, setQuantity] = useState(verifyQuantity());
  const priceBr = price.toString().replace('.', ',');

  const addItem = () => {
    setCarState((item) => {
      const car = [...item];
      const hasItem = car.some((itemCar) => itemCar.name === name);
      const sameItemIndex = car.findIndex((itemCar) => itemCar.name === name);
      const addingItem = item[sameItemIndex];
      if (hasItem) {
        addingItem.quantity += 1;
        return car;
      }
      return [...car, { id, name, price, quantity: 1 }];
    });
  };

  const removeItem = () => {
    setCarState((item) => {
      const car = [...item];
      const newCar = car.findIndex((itemCar) => itemCar.name === name);
      const addingItem = item[newCar];
      if (addingItem) {
        if (newCar >= 0 && addingItem.quantity > 1) {
          addingItem.quantity -= 1;
          return car;
        }
        if (addingItem.quantity === 1) {
          car.splice(car[newCar], 1);
          return car;
        }
      }
      return car;
    });
  };

  const nonNegativeQuantity = () => {
    if (quantity > 0) {
      return quantity - 1;
    }
    return 0;
  };

  return (
    <div className="card">
      <div className="infoCard">
        <p
          data-testid="customer_products__element-card-price"
        >
          { `R$${priceBr}` }
        </p>

        <img
          data-testid="customer_products__img-card-bg-image"
          src={ urlImage }
          alt={ name }
        />

        <h3
          data-testid="customer_products__button-card-add-item"
        >
          { name }
        </h3>
      </div>

      <div className="btnDivCard">
        <button
          data-testid="customer_products__button-card-rm-item"
          type="button"
          onClick={ () => {
            setQuantity(nonNegativeQuantity());
            removeItem();
          } }
        >
          -
        </button>
        <h2
          data-testid="customer_products__input-card-quantity"
        >
          { quantity }
        </h2>
        <button
          data-testid="customer_products__checkout-bottom-value"
          type="button"
          onClick={ () => {
            setQuantity(quantity + 1);
            // setCarState((car) => [...car, { name, price }]);
            addItem();
          } }
        >
          +
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  setCarState: PropTypes.func.isRequired,
};

export default Card;
