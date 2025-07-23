import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='min-h-[100vh] flex items-center justify-center'>
      <div className='text-white h-[75vh] w-full lg:w-[50vw] mx-auto shadow-2xl -translate-y-25 rounded-2xl'>
        <form className='flex flex-col items-center justify-center h-full gap-8 p-10 md:p-2'>
          <h2 className='text-4xl text-center'>Sign Up Now!</h2>
          <label htmlFor='username'>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>
          <label htmlFor='password'>
            <input
              type='password'
              name='password'
              id='password'
              required
              placeholder='password'
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>
          <label htmlFor='email'>
            <input
              type='email'
              name='email'
              id='email'
              required
              placeholder='email@gmail.com'
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>
          <label htmlFor='firstName'>
            <input
              type='text'
              name='firstName'
              id='firstName'
              placeholder='First Name'
              required
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>
          <label htmlFor='lastName'>
            <input
              type='text'
              name='lastName'
              id='lastName'
              placeholder='Last Name'
              required
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>

          <button
            type='submit'
            className='text-2xl py-2 px-6 rounded-2xl ring-[var(--pink)] bg-[var(--pink)] shadow-inner'
          >
            Login
          </button>
          <p>
            No Account?
            <Link to='signup' className='text-[var(--pink)]'>
              {' '}
              Sign Up Now!
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
