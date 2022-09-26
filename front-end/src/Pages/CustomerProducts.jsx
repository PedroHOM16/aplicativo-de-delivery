import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import '../CSS/CustomerProducts.css';
import { validateLogin, getProducts } from '../Services/RequestPost';
import { getUser, removeUser, setCar,
  setTotalCar, getTotalCarLocal } from '../Helpers/LocalStorage';
import Card from '../Components/Card';

function CustomerProducts() {
  const [products, setProducts] = useState('');
  const [carState, setCarState] = useState([]);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  const skolImgUrl = 'http://localhost:3001/images/skol_lata_350ml.jpg';

  const mockProducts = [
    {
      id: 1,
      name: 'a Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 2,
      name: 'b Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 3,
      name: 'c Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 4,
      name: 'd Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 5,
      name: 'e Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 6,
      name: 'f Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 7,
      name: 'g Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 8,
      name: 'h Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 9,
      name: 'i Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 10,
      name: 'j Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
    {
      id: 11,
      name: 'k Lata 250ml',
      price: 2.20,
      url_image: skolImgUrl,
    },
  ];

  const getTotalCar = () => {
    let totale = 0;
    carState.forEach((item) => {
      totale += item.price;
    });
    setTotal(totale.toFixed(2));
  };

  const getProductsFunc = async () => {
    const response = await getProducts('/customer/products');
    console.log(response);
  };

  useEffect(() => {
    getProductsFunc();
    setProducts(mockProducts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getTotalCar();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carState]);

  const validateLoginFunc = async () => {
    const { token } = getUser();
    const result = await validateLogin('login/validate', token);
    console.log(result);
    if (result.error) {
      removeUser();
      history.push('/login');
    }
  };

  useEffect(() => {
    validateLoginFunc();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const btnCar = () => {
    history.push('/customer/checkout');
    setCar(carState);
    setTotalCar(total);
  };

  return (
    <div>
      <NavBar />

      <main>
        { products && products.map(
          ({
            id,
            name,
            price,
            url_image: imgURL,
          }) => (<Card
            key={ id }
            name={ name }
            price={ price }
            imgURL={ imgURL }
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
