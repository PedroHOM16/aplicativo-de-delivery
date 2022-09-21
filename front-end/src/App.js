import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Provider from './Context/Provider';
import Home from './Components/Home';
import Login from './Pages/Login';

function App() {
  return (
    <Provider>
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
      </Switch>
    </Provider>
  );
}

export default App;
