import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { quantityFilterLocal } from '../Helpers/LocalStorage';
import '../CSS/Card.css';

function Card({ name, price, urlImage, setCarState }) {
  const [quantity, setQuantity] = useState(quantityFilterLocal(name));
  const priceBr = price.toString().replace('.', ',');

  const removeItem = () => {
    setCarState((item) => {
      const car = [...item];
      const newCar = car.findIndex((itemCar) => itemCar.name === name);
      if (newCar >= 0) {
        car.splice(newCar, 1);
        return car;
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
            setCarState((car) => [...car, { name, price }]);
          } }
        >
          +
        </button>
      </div>
    </div>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  setCarState: PropTypes.func.isRequired,
};

export default Card;
