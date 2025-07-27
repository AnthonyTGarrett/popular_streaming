import { useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const Login = () => {
  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useAuth();
  const handleLoginSubmit = e => {
    e.preventDefault();
    if (userInput.username !== '' && userInput.password !== '') {
      auth.loginAction(userInput);
      setIsLoggedIn(true);
      return;
    }

    setErrorMessage('Invalid Credentials');
  };
  const handleInput = e => {
    const { name, value } = e.target;

    setUserInput(oldUserInput => ({
      ...oldUserInput,
      [name]: value,
    }));
  };

  return (
    <div className='min-h-[100vh] flex items-center justify-center'>
      <div className='text-white h-[50vh] w-full lg:w-[50vw] xl:w-[40vw] mx-auto shadow-2xl -translate-y-25 rounded-2xl'>
        <form
          className='flex flex-col items-center justify-center h-full gap-8 p-5'
          onSubmit={handleLoginSubmit}
        >
          <h2 className='text-4xl text-center'>Log In Now!</h2>
          {errorMessage && (
            <p className={'text-red-600 text-xl'}>Invalid Credentials</p>
          )}
          <label htmlFor='username'>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              required
              onChange={handleInput}
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>
          <label htmlFor='password'>
            <input
              type='password'
              name='password'
              id='password'
              required
              placeholder='Password'
              onChange={handleInput}
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>

          <button
            type='submit'
            className='text-2xl py-2 px-6 rounded-2xl ring-[var(--pink)] bg-[var(--pink)] shadow-inner hover:cursor-pointer'
          >
            Login
          </button>

          <p>
            No Account?
            <Link to='/register' className='text-[var(--pink)]'>
              {' '}
              Sign Up Now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
