import React from 'react';
import { FaStar } from 'react-icons/fa6';

const ShowCard = ({ show }) => {
  return (
    <div className='w-full flex flex-col p-6 bg-black hover:bg-[#2c2c2c] sm: flex-1/1'>
      <img src={show.imageSet.verticalPoster.w360}></img>
      <div className='flex h-20 justify-between pl-2.5 pr-2.5'>
        <div className='text-white self-end'>{show.releaseYear}</div>
        <div className='h-10 self-end flex items-center gap-1'>
          <FaStar color='yellow' /> {show.rating}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
