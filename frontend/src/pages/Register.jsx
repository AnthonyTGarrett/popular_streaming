import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });
      const res = await response.json();

      if (res.status === 201) {
        navigate('/login', { state: { welcome: res.message } });
      } else {
        setErrorMessage(res.msg);
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
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
      <div className='text-white h-[75vh] w-full lg:w-[50vw] mx-auto shadow-2xl -translate-y-25 rounded-2xl'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col items-center justify-center h-full gap-8 p-10 md:p-2'
        >
          <h2 className='text-4xl text-center'>Sign Up Now!</h2>
          {errorMessage && (
            <p className={'text-red-600 text-xl'}>{errorMessage}</p>
          )}
          <label htmlFor='username'>
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Username'
              onChange={e => {
                handleInput(e);
                setErrorMessage('');
              }}
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
              onChange={e => {
                handleInput(e);
                setErrorMessage('');
              }}
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
              onChange={e => {
                handleInput(e);
                setErrorMessage('');
              }}
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>
          <label htmlFor='firstName'>
            <input
              type='text'
              name='firstName'
              id='firstName'
              placeholder='First Name'
              onChange={e => {
                handleInput(e);
                setErrorMessage('');
              }}
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
              onChange={e => {
                handleInput(e);
                setErrorMessage('');
              }}
              required
              className='bg-[#2c2c2c] border border-[var(--pink)] rounded-lg focus:ring-2 focus:ring-[var(--pink)] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
            ></input>
          </label>

          <button
            type='submit'
            className='text-2xl py-2 px-6 rounded-2xl ring-[var(--pink)] bg-[var(--pink)] shadow-inner'
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
