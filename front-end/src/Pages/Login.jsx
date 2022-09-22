import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { requestLogin } from '../Axios/RequestLogin';
import { setUser } from '../Helpers/LocalStorage';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [renderError, setRenderErro] = useState(false);
  const history = useHistory();

  const validateEmail = () => {
    const regex = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+$/i;
    return !email.match(regex);
  };

  const validatePassword = () => {
    const minPassword = 6;
    return password.length < minPassword;
  };

  const validateLogin = async () => {
    try {
      const result = await requestLogin('http://localhost:3001/login', { email, password });
      setUser(result);
      history.push('/customer/products');
    } catch (error) {
      setRenderErro(true);
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
        onClick={ validateLogin }
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
        ? (
          <p data-testid="common_login__element-invalid-email">
            Usuário ou Senha Inválido
          </p>
        )
        : undefined}
    </div>
  );
}

export default Login;
