import React from 'react'
import { Text } from '../../common/locale/script';
import { useSelector } from 'react-redux';
export const Footer = () => {
  return (
    <footer className="bg-blue-900  p-1 md:p-2 text-center ">
      <p className='!text-white font-semibold'>&copy; 2024 Rocket Post. All rights reserved.</p>
    </footer>)
}

