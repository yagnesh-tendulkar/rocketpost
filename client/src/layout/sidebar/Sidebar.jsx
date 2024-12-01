// src/components/Sidebar.jsx
import { LucideContact, LucideHome, LucideInfo, LucideSettings } from 'lucide-react';
import React from 'react';

// className="bg-gray-300 text-white w-24 md:w-44 p-1 md:p-4">
export const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`bg-white text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}  text-white w-24 md:w-44 p-1 md:p-4 fixed inset-y-0 left-0 z-30`}>
      <nav>
        <ul>
          <li className="mt-2 text-black font-semibold flex cursor-pointer">
            <LucideHome className='p-1 mt-1 text-black font-semibold' />  <div className="hover:text-gray-400">Home</div>
          </li>
          <hr className="my-2" />
          <li className="mt-2 text-black font-semibold flex cursor-pointer">
            <LucideInfo className='p-1 mt-1 text-black font-semibold' /> <div className="hover:text-gray-400">About</div>
          </li>
          <hr className="my-2" />

          <li className="mt-2 text-black font-semibold flex cursor-pointer">
            <LucideContact className='p-1 mt-1 text-black font-semibold' />  <div className="hover:text-gray-400">Contact</div>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
