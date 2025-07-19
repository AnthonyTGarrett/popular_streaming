import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const ShowCard = ({ show }) => {
  const navigate = useNavigate();
  const displaySingle = () => {
    navigate('/show', { state: { id: show.imdbId } });
  };

  return (
    <div
      className='flex flex-col p-3 justify-between bg-black hover:bg-[#2c2c2c] hover:rounded cursor-pointer'
      onClick={displaySingle}
    >
      <img src={show.imageSet.horizontalPoster.w360} className='h-[75%]'></img>
      <div className='flex h-20 justify-between items-center pl-2.5 pr-2.5'>
        <div className='self-end flex pb-1.5'>
          {show.releaseYear ? show.releaseYear : show.firstAirYear}
        </div>
        <div className='h-10 self-end items-center flex gap-1'>
          <FaStar color='yellow' /> {show.rating / 10}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
