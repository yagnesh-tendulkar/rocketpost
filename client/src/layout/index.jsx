// src/components/Layout.jsx
import React, { useState } from 'react';
import { Header } from './header/Header';
import { Footer } from './footer/Footer';
import { Sidebar } from './sidebar/Sidebar';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (

    <div className="flex flex-col h-[100vh]">
      <Header toggleSidebar={toggleSidebar} />
      <div className="flex flex-grow relative h-[90vh] overflow-y-auto" >
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`flex-grow bg-gray-100 p-4 transition-all duration-300 ${isSidebarOpen ? 'opacity-50' : 'opacity-100'}`}>
          <Outlet />
        </main>
        {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20" onClick={toggleSidebar}></div>}
      </div>
      <Footer />
    </div>
  );

};

export default Layout;
