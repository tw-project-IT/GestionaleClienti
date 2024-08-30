import React from "react";

import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
import { NotifyProvider } from "./components/notify/Notify";
import Boilers from "./pages/boilers/Boilers";

function App() {

  return (
      <NotifyProvider>
          <BrowserRouter>
              <Routes>
                  <Route path='/' element={ <Dashboard /> } />
                  <Route path='/customers' element={ <Customers /> } />
                  <Route path='/boilers' element={ <Boilers /> } />
              </Routes>
          </BrowserRouter>
      </NotifyProvider>
  );
}

export default App;