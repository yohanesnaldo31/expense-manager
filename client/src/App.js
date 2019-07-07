import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './components/Layout/Navbar';
import Landing from './components/Layout/Landing';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Landing />
        
      </div>
    </BrowserRouter>
    
  );
}

export default App;
