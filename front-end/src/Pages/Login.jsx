import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../Services/RequestPost';
import { getUser, setUser } from '../Helpers/LocalStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [renderError, setRenderError] = useState('');
  const history = useHistory();

  const validateEmail = () => {
    const regex = /\S+@\S+\.\S+/;
    return !email.match(regex);
  };

  const validatePassword = () => {
    const minPassword = 6;
    return password.length < minPassword;
  };

  const stillLoggedIn = async () => {
    const result = await requestLogin('/login', { email, password });
    setRenderError('');
    setUser(result);
    const user = getUser();
    if (!user) return false;
    const customerUrl = '/customer/products';
    const sellersUrl = '/sellers/orders';
    switch (user.role) {
    case 'customer':
      return history.push(customerUrl);
    case 'seller':
      return history.push(sellersUrl);
    case 'administrator':
    default:
      return history.push('/');
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="common_login__input-email"
        onChange={ ({ target }) => {
          setEmail(target.value);
        } }
      />

      <input
        type="password"
        data-testid="common_login__input-password"
        onChange={ ({ target }) => {
          setPassword(target.value);
        } }
      />

      <button
        type="button"
        data-testid="common_login__button-login"
        disabled={ validateEmail() || validatePassword() }
        onClick={ stillLoggedIn }
      >
        Login
      </button>

      <button
        type="button"
        data-testid="common_login__button-register"
        onClick={ () => history.push('/register') }
      >
        Ainda não tenho conta
      </button>

      { renderError
        && (
          <p data-testid="common_login__element-invalid-email">
            {renderError}
          </p>
        )}
    </div>
  );
}

export default Login;
