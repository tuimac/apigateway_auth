import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={true} component={Login} path="/login" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
