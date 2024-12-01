// src/App.jsx
import React from 'react';
import Layout from './layout/index';
import Home from './screens/home/Home';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import Payment from './screens/payment/Payment';

import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
const App = () => {
  return (
    <Routes>
      {/* Use Layout as a wrapper */}
      <Route path="/" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="" element={<Layout />}>
        <Route path="create" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="payment" element={<Payment />} />

      </Route>
    </Routes>
  );
};

export default App;
