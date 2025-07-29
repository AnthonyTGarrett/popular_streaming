import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';
import logo from '../assets/img/logos/logo.png';

const Navbar = () => {
  let isLoggedIn = true;
  const auth = useAuth();
  const linkClass = ({ isActive }) => {
    return isActive
      ? 'text-[#E0115F] transition hover:text-opacity-30'
      : 'hover:text-[#E0115F] transition';
  };

  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  if (localStorage.getItem('token')) {
    isLoggedIn = true;
  } else {
    isLoggedIn = false;
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-transparent w-full ${isLandingPage ? 'fixed' : ''}`}>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='flex flex-1 items-center justify-between md:items-stretch md:justify-start'>
          {/* <!-- Logo --> */}
          <NavLink className='flex flex-shrink-0 items-center mr-10' to='/home'>
            <img className='h-auto w-50' src={logo} alt='Popular Streaming' />
          </NavLink>
          <div className='md:ml-auto flex items-center -mt-6'>
            <button
              id='hamburger-button'
              className='md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10'
              onClick={toggleMenu}
            >
              <div
                className={`hamburger-line line-top transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'transform translate-y-2 rotate-45' : ''
                }`}
              ></div>
              <div
                className={`hamburger-line line-middle my-1.5 transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              ></div>
              <div
                className={`hamburger-line line-bottom transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'transform -translate-y-3.5 -rotate-45' : ''
                }`}
              ></div>
            </button>
            <div className='hidden md:flex sm: space-x-2 lg:space-x-4 text-white text-xl'>
              <NavLink to='/home' className={linkClass}>
                Home
              </NavLink>
              {isLoggedIn ? (
                <NavLink to='/dashboard' className={linkClass}>
                  Watch Lists
                </NavLink>
              ) : (
                ''
              )}
              {isLoggedIn ? (
                <NavLink
                  onClick={auth.logOut}
                  className={`hover:text-[#e0115f]`}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink to='/login' className={linkClass}>
                  Login
                </NavLink>
              )}
            </div>
            <div className={isMenuOpen ? 'openLinks' : 'closedLinks'}>
              <div className='flex flex-col gap-8 items-center justify-center text-4xl -translate-y-30 '>
                <NavLink to='/home' onClick={toggleMenu}>
                  Home
                </NavLink>

                {isLoggedIn ? (
                  <NavLink to='/dashboard' onClick={toggleMenu}>
                    Watchlist
                  </NavLink>
                ) : (
                  ''
                )}
                {isLoggedIn ? (
                  <NavLink onClick={auth.logOut}>Logout</NavLink>
                ) : (
                  <NavLink to='/login' onClick={toggleMenu}>
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
