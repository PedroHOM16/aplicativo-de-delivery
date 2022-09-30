import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import { getOrderById, changeStatusSeller } from '../Services/RequestPost';
import { getUser } from '../Helpers/LocalStorage';

function SellersDetails() {
  const [carState, setCarState] = useState();
  const [total, setTotal] = useState();
  const [seller, setSeller] = useState();
  const location = useLocation();
  const LABEL = 'seller_order_details__element-order-details-label-delivery-status';
  const ID = 'seller_order_details__element-order-table-unit-price';

  const getOrderByIdFunc = async () => {
    const { token } = getUser();
    const { pathname } = location;
    const idUrl = pathname.split('/')[3];
    const { data } = await getOrderById(token, idUrl);
    setCarState(data.products);
    const { id, sellerName, totalPrice, status, saleDate } = data;
    const sellerObj = { id, sellerName, totalPrice, status, saleDate };
    setSeller(sellerObj);
    setTotal(totalPrice);
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getOrderByIdFunc();
    };
    asyncFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeStatusBtn = async (status) => {
    const { token } = getUser();
    const { pathname } = location;
    const idUrl = pathname.split('/')[3];
    await changeStatusSeller(status, token, idUrl);
  };

  const renderSalle = ({ id, status, saleDate }) => {
    const size = -4;
    const idH1 = (`000${id}`).slice(size);
    return (
      <>
        <label
          htmlFor="id"
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          <h1 id="id">{`Pedido ${idH1}`}</h1>
        </label>

        <label
          htmlFor="saleDate"
          data-testid="seller_order_details__element-order-details-label-order-date"
        >
          <h1>{ saleDate }</h1>
        </label>
        <label
          htmlFor="status"
          data-testid={ LABEL }
        >
          <h1>{ status }</h1>
        </label>
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
          onClick={ () => { changeStatusBtn('preparing'); } }
        >
          Preparar Pedido
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          onClick={ () => { changeStatusBtn('dispatch'); } }
        >
          Saiu para Entrega
        </button>
      </>
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
                  `seller_order_details__element-order-table-item-number--${i}`
                }
              >
                { i + 1 }
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-name-${i}` }
              >
                { item.name }
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-quantity-${i}` }
              >
                { item.quantity }
              </td>
              <td
                data-testid={ `${ID}-${i}` }
              >
                { item.price.replace('.', ',') }
              </td>
              <td
                data-testid={ `seller_order_details__element-order-table-sub-total-${i}` }
              >
                { item.subTotal.toFixed(2).replace('.', ',') }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
      <div>
        Total: R$
        <h2 data-testid="seller_order_details__element-order-total-price">
          {total && total.replace('.', ',')}
        </h2>
      </div>
    </div>
  );
}
export default SellersDetails;
