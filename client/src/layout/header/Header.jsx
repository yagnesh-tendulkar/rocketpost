// src/components/Header.jsx
import { LucideMenu } from 'lucide-react';
import React from 'react';

export const Header = ({ toggleSidebar }) => {
  return (
    <header className=" p-1 md:p-2 flex h-[8vh] items-center">
      <button onClick={toggleSidebar} className="text-black">
        <LucideMenu className='p-1 md:p-0 text-black font-bold' />
      </button>
      <h1 className="text-2xl md:text-xl pl-1 font-bold">Rocket Post</h1>
    </header>
  );
};