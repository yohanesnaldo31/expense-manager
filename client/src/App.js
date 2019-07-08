import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthtoken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';

import store from './store/store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './containers/auth/Register';
import Login from './containers/auth/Login';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/dashboard/Dashboard';

import './App.css';

// check if jwtToken exist
if(localStorage.jwtToken){
  // check for token 
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // decode token and get user data
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currentTime = Date.now();
  if (decoded.exp < currentTime){
    //logout the user
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
          </Switch>
          
        </div>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
