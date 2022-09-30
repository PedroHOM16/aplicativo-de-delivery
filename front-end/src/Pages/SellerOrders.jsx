import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBarS from '../Components/NavBarS';
// import { getSallesSeller } from '../Services/RequestPost';
// import { getUser } from '../Helpers/LocalStorage';

function SellersOrders() {
  const [salles, setSalles] = useState();
  const history = useHistory();

  const mock = [
    {
      id: '3',
      totalPrice: '100.9',
      status: 'Pendente',
      saleDate: '25/02/03',
      address: 'R Aasdasdas Asdasd',
    },
    {
      id: '2',
      totalPrice: '120.9',
      status: 'Pendente',
      saleDate: '25/03/03',
      address: 'R dgdagg Asdasd',
    },
    {
      id: '1',
      totalPrice: '130.9',
      status: 'Pendente',
      saleDate: '25/06/03',
      address: 'R rruyrtur Asdasd',
    },
  ];

  const getSallesFunc = async () => {
    // const { token } = getUser();
    // const { data } = await getSallesSeller(token);
    setSalles(mock);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getSallesFunc();
    };
    asyncFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderSalles = () => salles.map(({ id, totalPrice, status,
    saleDate, address }) => {
    const size = -4;
    const idH1 = (`000${id}`).slice(size);
    return (
      <button
        type="button"
        key={ id }
        onClick={ () => history.push(`/seller/orders/${id}`) }
      >
        <h1
          data-testid={ `seller_orders__element-order-id-${id}` }
        >
          {`Pedido ${idH1}`}
        </h1>
        <h3
          data-testid={ `seller_orders__element-delivery-status-${id}` }
        >
          { status }
        </h3>
        <h3
          data-testid={ `seller_orders__element-order-date-${id}` }
        >
          { saleDate }
        </h3>
        <h3
          data-testid={ `seller_orders__element-card-price-${id}` }
        >
          { totalPrice.replace('.', ',') }
        </h3>

        <h3
          data-testid={ `seller_orders__element-card-address-${id}` }
        >
          { address }
        </h3>
      </button>
    );
  });

  return (
    <div>
      <NavBarS />

      { salles && renderSalles() }
    </div>
  );
}

export default SellersOrders;
