import React from 'react';
import ShowSingle from '../components/ShowSingle';
import { useLocation } from 'react-router-dom';

/**
 * A React Component that passes the show ID down to the component that displays a single show
 * @returns The rendered component.
 */
const SinglePage = () => {
  const location = useLocation();

  const { id } = location.state || {};

  return (
    <div className='text-white text-3xl pt-[150px] min-h-[100vh] w-full lg:w-[80vw] mx-auto'>
      <ShowSingle id={id} />
    </div>
  );
};

export default SinglePage;
