import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { getSalles } from '../Services/RequestPost';
import { getUser } from '../Helpers/LocalStorage';

function CustomerMyOrders() {
  const [salles, setSalles] = useState();
  const location = useLocation();

  const getSallesFunc = async () => {
    const { token } = getUser();
    const { pathname } = location;
    const idUrl = pathname.split('/')[3];
    const { data } = await getSalles(token, idUrl);
    setSalles(data);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getSallesFunc();
    };
    asyncFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSalles = () => salles.map(({ id, totalPrice, status, saleDate }) => {
    const id3 = 3;
    if (id.length === 1) {
      id = `000${id}`;
    } else
    if (id.length === 2) {
      id = `00${id}`;
    } else
    if (id.length === id3) {
      id = `0${id}`;
    }
    return (
      <div key={ id }>
        <h1
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {`Pedido ${id}`}
        </h1>
        <h3
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </h3>
        <h3
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { saleDate }
        </h3>
        <h3
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          { totalPrice }
        </h3>
      </div>
    );
  });

  return (
    <div>
      <NavBar />

      { salles && renderSalles() }
    </div>
  );
}

export default CustomerMyOrders;
