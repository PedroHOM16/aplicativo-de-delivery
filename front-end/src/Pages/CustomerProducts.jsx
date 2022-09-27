import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import '../CSS/CustomerProducts.css';
import { getProducts } from '../Services/RequestPost';
import { getUser, removeUser, setCar,
  setTotalCar, getTotalCarLocal, getCar } from '../Helpers/LocalStorage';
import Card from '../Components/Card';

function CustomerProducts() {
  const [products, setProducts] = useState();
  const [carState, setCarState] = useState(getCar());
  const [total, setTotal] = useState();
  const history = useHistory();

  const getTotalCarFunc = () => {
    let totale = 0;
    carState.forEach((item) => {
      totale += Number(item.price);
    });
    setTotal(totale.toFixed(2));
  };

  const getProductsFunc = async () => {
    try {
      const { token } = getUser();
      const { data } = await getProducts('/customer/products', token);
      setProducts(data);
    } catch (error) {
      removeUser();
      history.push('/login');
    }
  };

  useEffect(() => {
    const asyncFunc = async () => {
      await getProductsFunc();
    };
    asyncFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTotalCarFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carState]);

  useEffect(() => {
    if (getTotalCarLocal()) {
      setTotal(getTotalCarLocal());
    }
  }, []);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnCar = () => {
    setCar(carState);
    setTotalCar(total);
    history.push('/customer/checkout');
  };

  return (
    <div>
      { products && <NavBar /> }

      <main className="mainProducts">
        { products && products.map(
          ({
            id,
            name,
            price,
            urlImage,
          }) => (<Card
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            urlImage={ urlImage }
            setCarState={ setCarState }
          />),
        )}
      </main>

      <button type="button" onClick={ btnCar }>
        Carrinho de Compras:R$
        { total }
      </button>
    </div>
  );
}

export default CustomerProducts;

// {
//   id: 1,
//   name: 'Skol Lata 250ml',
//   price: 2.20,
//   url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
// }

// const quantityFilter = car.filter((localItem) => localItem.name === name).length;
