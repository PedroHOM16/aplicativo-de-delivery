import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import Provider from './Context/Provider';
import Home from './Components/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import CustomerProducts from './Pages/CustomerProducts';

function App() {
  return (
    // <Provider>
    <Switch>
      <Route
        path="/"
        component={ Home }
        exact
      />
      <Route
        path="/login"
        component={ Login }
        exact
      />
      <Route
        path="/register"
        component={ Register }
        exact
      />
      <Route
        path="/customer/products"
        component={ CustomerProducts }
        exact
      />
    </Switch>
    // </Provider>
  );
}

export default App;
