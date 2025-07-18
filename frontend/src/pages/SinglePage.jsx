import React from 'react';
import ShowSingle from '../components/ShowSingle';
import { useLocation } from 'react-router-dom';

const SinglePage = () => {
  const location = useLocation();

  const { id } = location.state || {};

  return (
    <div className='text-white text-3xl pt-[150px]'>
      <ShowSingle id={id} />
    </div>
  );
};

export default SinglePage;
