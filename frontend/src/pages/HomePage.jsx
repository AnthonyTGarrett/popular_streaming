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
      <div className='flex flex-col md:flex-row py-6 px-10 md:px-40 h-full'>
        <div className='h-full flex flex-col justify-center space-x-7 basis-2/2 md:basis-1/2'>
          <h2 className='text-white text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none mb-5'>
            Find Popular<br></br> Shows.
          </h2>
          <h2 className='text-white text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none mb-2'>
            Track What <br></br>You Watch.
          </h2>
          <h3 className='text-[#E0115F] text-3xl md:text-4xl xl:text-6xl self-end md:self-end font-bold'>
            We Can Help.
          </h3>
        </div>
        <div className='hidden md:flex h-full flex-col justify-center items-center basis-1/2'>
          <div className='grid grid-cols-2 gap-y-8 gap-x-16 xl:gap-y-10 xl:gap-x-18 mb-10'>
            <Link>
              <img src={netflix} className='w-45'></img>
            </Link>
            <Link>
              <img src={prime} className='w-45'></img>
            </Link>
            <Link>
              <img src={disney} className='w-45'></img>
            </Link>
            <Link>
              <img src={max} className='w-45'></img>
            </Link>
            <Link>
              <img src={apple} className='w-45'></img>
            </Link>
            <Link>
              <img src={hulu} className='w-45'></img>
            </Link>
          </div>
          <div>
            <Link
              to='/home'
              className='bg-[#E0115F] px-8 py-4 xl:px-10 xl:py-5 rounded-2xl text-2xl text-white'
            >
              Get Started
            </Link>
          </div>
        </div>
        <Link
          to='/home'
          className='md:hidden bg-[#E0115F] px-10 py-5 rounded-2xl text-2xl text-white text-center'
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
