import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/img/logos/logo.png';

const Navbar = () => {
  const linkClass = ({ isActive }) => {
    return isActive
      ? 'text-[#E0115F] transition hover:text-opacity-30'
      : 'hover:text-[#E0115F] transition';
  };

  return (
    <nav className='bg-black border-b border-gray-200 w-full'>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
          {/* <!-- Logo --> */}
          <NavLink className='flex flex-shrink-0 items-center mr-4' to='/home'>
            <img className='h-auto w-40' src={logo} alt='Popular Streaming' />
          </NavLink>
          <div className='md:ml-auto flex items-center'>
            <div className='flex sm: space-x-2 lg:space-x-4 text-white text-xl'>
              <NavLink to='/home' className={linkClass}>
                Home
              </NavLink>
              <NavLink to='/movies' className={linkClass}>
                Movies
              </NavLink>
              <NavLink to='/series' className={linkClass}>
                Series
              </NavLink>
              <NavLink to='/login' className={linkClass}>
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
