import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestLogin } from '../Axios/RequestLogin';
import { setUser } from '../Helpers/LocalStorage';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [renderError, setRenderErro] = useState(false);

  const validateName = () => {
    const minName = 12;
    return name.length < minName;
  };

  const validateEmail = () => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
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
    } catch (error) {
      setRenderErro(true);
    }
  };

  return (
    <div>
      Cadastro

      <input
        type="text"
        data-testid="common_register__input-name"
        onChange={ ({ target }) => {
          setName(target.value);
        } }
      />

      <input
        type="text"
        data-testid="common_register__input-email"
        onChange={ ({ target }) => {
          setEmail(target.value);
        } }
      />

      <input
        type="password"
        data-testid="common_register__input-password"
        onChange={ ({ target }) => {
          setPassword(target.value);
        } }
      />

      <button
        type="button"
        data-testid="common_register__button-register"
        disabled={ validateEmail() || validatePassword() || validateName() }
        onClick={ validateLogin }
      >
        <Link to="customer/products">Cadastrar</Link>
      </button>

      { renderError
        ? (
          <p data-testid="common_register__element-invalid_register">
            Dados Inválidos
          </p>
        )
        : undefined}
    </div>
  );
}

export default Register;
