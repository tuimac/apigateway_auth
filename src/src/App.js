import React from 'react';
import { 
  BrowserRouter,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Upload from './components/Upload';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <PublicRoute restricted={false} component={Login} path="/login" exact />
          <PublicRoute restricted={false} component={Signup} path="/signup" exact />
          <PrivateRoute component={Home} path="/home" exact />
          <PrivateRoute component={Upload} path="/upload" exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
