import React, { useState } from 'react';
// import { requestLogin } from '../axios/requestLogin';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = () => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    return !email.match(regex);
  };

  const validatePassword = () => {
    const minPassword = 6;
    return password.length < minPassword;
  };

  const validateLogin = async () => {
    // const result = await requestLogin('http://localhost:3001/login', { email, password });
    // if (!result) {
    // }
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
      >
        Ainda não tenho conta
      </button>

      <p data-testid="common_login__element-invalid-email">a</p>
    </div>
  );
}

export default Login;
