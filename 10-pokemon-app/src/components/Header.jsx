import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='fixed z-10 flex justify-center w-full bg-red-500'>
      <div className='flex flex-row items-center justify-between w-full lg:w-[1024px] px-10 py-5'>
        <Link to={'/'}>
          <img
            className='h-12'
            src='https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg'
            alt='pokemon logo'
          />
        </Link>
        <img
          className='h-12 rounded-full'
          src='https://www.zenplates.co/assets/images/documentation/avatars/default.png'
          alt='user avatar'
        />
      </div>
    </div>
  );
};

export default Header;
