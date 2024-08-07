import React from "react";

import './App.css';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={ <Dashboard /> } />
          <Route path='/customers' element={ <Customers /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;