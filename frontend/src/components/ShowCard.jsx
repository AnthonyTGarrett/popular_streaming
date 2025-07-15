import React from 'react';
import { FaStar } from 'react-icons/fa6';

const ShowCard = ({ show }) => {
  return (
    <div className='flex flex-col p-5 bg-black hover:bg-[#2c2c2c] hover:rounded'>
      <img src={show.imageSet.verticalPoster.w360}></img>
      <div className='flex h-20 justify-between items-center pl-2.5 pr-2.5'>
        <div className='self-end flex pb-1.5'>{show.releaseYear}</div>
        <div className='h-10 self-end items-center flex gap-1'>
          <FaStar color='yellow' /> {show.rating}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
