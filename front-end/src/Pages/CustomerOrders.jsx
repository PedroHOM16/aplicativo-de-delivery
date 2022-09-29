import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { getSeller, changeStatus } from '../Services/RequestPost';
import { getUser } from '../Helpers/LocalStorage';

function CustomerOrders() {
  const [carState, setCarState] = useState();
  const [total, setTotal] = useState();
  const [seller, setSeller] = useState();
  const location = useLocation();

  const getSellerFunc = async () => {
    const { token } = getUser();
    const { pathname } = location;
    const idUrl = pathname.split('/')[3];
    const { data } = await getSeller(token, idUrl);
    setCarState(data.products);
    const { id, sellerName, totalPrice, status, saleDate } = data;
    const sellerObj = { id, sellerName, totalPrice, status, saleDate };
    setSeller(sellerObj);
    setTotal(totalPrice);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getSellerFunc();
    };
    asyncFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStatusBtn = async () => {
    const { token } = getUser();
    const { pathname } = location;
    const idUrl = pathname.split('/')[3];
    await changeStatus(token, idUrl);
  };

  const renderSalle = ({ id, sellerName, status, saleDate }) => {
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
      <div>
        <label
          htmlFor="id"
          data-testid="customer_order_details__element-order-details-label-order-id"
        >
          <h1 id="id">{`Pedido ${id}`}</h1>
        </label>
        <label
          htmlFor="sellerName"
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          <h3>{`P. Vend: ${sellerName}`}</h3>
        </label>
        <label
          htmlFor="saleDate"
          data-testid="customer_order_details__element-order-details-label-order-date"
        >
          <h1>{ saleDate }</h1>
        </label>
        <label
          htmlFor="status"
          data-testid={ `customer_order_details__
          element-order-details-label-delivery-status` }
        >
          <h1>{ status }</h1>
        </label>
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          onClick={ changeStatusBtn }
        >
          Marcar como entregue
        </button>
      </div>
    );
  };

  return (
    <div>
      <NavBar />
      <h2>Detalhes do Pedido</h2>
      { seller && renderSalle(seller) }
      <table>
        <thead>
          <tr>
            <td>Item</td>
            <td>Descrição</td>
            <td>Quantidade</td>
            <td>Valor Unitário</td>
            <td>Sub-total</td>
          </tr>
        </thead>
        <tbody>
          { carState && carState.map((item, i) => (
            <tr key={ i }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${i}`
                }
              >
                { i + 1 }
              </td>
              <td
                data-testid={ `customer_order_details__element-order-table-name-${i}` }
              >
                { item.name }
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-quantity-${i}` }
              >
                { item.quantity }
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-unit-price-${i}` }
              >
                { item.price.toFixed(2).replace('.', ',') }
              </td>
              <td
                data-testid={ `customer_order_details__
                element-order-table-sub-total-${i}` }
              >
                { item.subTotal.toFixed(2).replace('.', ',') }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <div>
        Total: R$
        <h2 data-testid="customer_order_details__element-order-total-price">
          {total && total.replace('.', ',')}
        </h2>
      </div>
    </div>
  );
}
export default CustomerOrders;
