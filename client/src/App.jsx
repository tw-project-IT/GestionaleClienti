import React from "react";

import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from "./pages/dashboard/Dashboard";
import Customers from "./pages/customers/Customers";
import { NotifyProvider } from "./components/notify/Notify";
import Boilers from "./pages/boilers/Boilers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./pages/login/Login";

function App() {

  return (
      <GoogleOAuthProvider clientId="1056041880555-v4bc1nqh1dn2gmt21hk3tp98uffcpuv2.apps.googleusercontent.com">
          <NotifyProvider>
              <BrowserRouter>
                  <Routes>
                      <Route path='/' element={ <Dashboard /> } />
                      <Route path='/login' element={ <Login /> } />
                      <Route path='/customers' element={ <Customers /> } />
                      <Route path='/boilers' element={ <Boilers /> } />
                  </Routes>
              </BrowserRouter>
          </NotifyProvider>
      </GoogleOAuthProvider>
  );
}

export default App;