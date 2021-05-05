import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={Login} path="/login" exact />
          <PrivateRoute component={Home} path="/home" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
