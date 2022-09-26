import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import { setCar, removeCar } from '../Helpers/LocalStorage';

function Card({ name, price, url_image: imgURL, setCarState }) {
  const [quantity, setQuantity] = useState(0);
  const priceBr = price.toString().replace('.', ',');

  const removeItem = () => {
    setCarState((item) => {
      const car = [...item];
      const newCar = car.findIndex((itemCar) => itemCar.name === name);
      car.splice(newCar, 1);
      return car;
    });
  };

  return (
    <div className="card">
      <p
        data-testid="customer_products__element-card-price"
      >
        { `R$${priceBr}` }
      </p>

      <img
        data-testid="customer_products__img-card-bg-image"
        src={ imgURL }
        alt={ name }
      />

      <h3
        data-testid="customer_products__button-card-add-item"
      >
        { name }
      </h3>

      <div>
        <button
          data-testid="customer_products__button-card-rm-item"
          type="button"
          onClick={ () => {
            setQuantity(quantity - 1);
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
  url_image: PropTypes.string.isRequired,
  setCarState: PropTypes.func.isRequired,
};

export default Card;
