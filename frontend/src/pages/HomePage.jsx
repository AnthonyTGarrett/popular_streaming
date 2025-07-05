import React from 'react';
import { Link } from 'react-router-dom';
import netflix from '../assets/img/logos/netflix-dark.svg';
import apple from '../assets/img/logos/apple-dark.svg';
import prime from '../assets/img/logos/prime-dark.svg';
import disney from '../assets/img/logos/disney-dark.svg';
import max from '../assets/img/logos/max-dark.svg';
import hulu from '../assets/img/logos/hulu-dark.svg';

const HomePage = () => {
  return (
    <section className='h-screen p-0 hero bg-cover'>
      <div className='flex py-6 px-10 md:px-40 h-full'>
        <div className='h-full flex flex-col justify-center space-x-7'>
          <h2 className='text-white lg:text-9xl md:text-4xl sm:text-2xl font-bold leading-none mb-5'>
            Find Popular<br></br> Shows.
          </h2>
          <h2 className='text-white lg:text-9xl md:text-4xl sm:text-2xl font-bold leading-none mb-2'>
            Track What <br></br>You Watch.
          </h2>
          <h3 className='text-[#E0115F] text-7xl self-end font-bold'>
            We Can Help.
          </h3>
        </div>
        <div className='sm:hidden md:flex h-full flex-col justify-center items-center flex-1'>
          <div className='grid grid-cols-2 gap-y-12 gap-x-20 mb-10'>
            <Link>
              <img src={netflix} className='w-50'></img>
            </Link>
            <Link>
              <img src={prime} className='w-50'></img>
            </Link>
            <Link>
              <img src={disney} className='w-50'></img>
            </Link>
            <Link>
              <img src={max} className='w-50'></img>
            </Link>
            <Link>
              <img src={apple} className='w-50'></img>
            </Link>
            <Link>
              <img src={hulu} className='w-50'></img>
            </Link>
          </div>
          <div>
            <button className='bg-[#E0115F] px-10 py-5 rounded-2xl text-2xl text-white'>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
