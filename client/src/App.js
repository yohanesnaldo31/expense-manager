import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store/store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './containers/auth/Register';
import Login from './containers/auth/Login';


import './App.css';

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
          </Switch>
          
        </div>
      </BrowserRouter>
    </Provider>
    
  );
}

export default App;
