import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='w-full'>
      <Header />
      <div className='w-full lg:w-[1024px] py-24 px-10 mx-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
