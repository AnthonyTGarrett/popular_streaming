import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const ShowCard = ({ show, seen = false }) => {
  const navigate = useNavigate();
  let image = '';
  if (show.imageSet) {
    image = show.imageSet.verticalPoster.w360;
  } else {
    image = show.image;
  }
  const displaySingle = () => {
    navigate('/show', { state: { id: show.imdbId } });
  };

  return (
    <div
      className={`flex flex-col p-3 rounded-md justify-between bg-black hover:bg-[#444] hover:rounded cursor-pointer hover:shadow-2xl transition-all duration-250 relative ${
        seen ? 'grayscale watched' : ''
      }`}
      onClick={displaySingle}
    >
      <img src={image} className='h-[85%]'></img>
      <div className='flex h-5 justify-between items-center px-2.5'>
        <div className='self-end flex pb-1.5 text-white'>
          {show.releaseYear
            ? show.releaseYear
            : show.firstAirYear
            ? show.firstAirYear
            : show.title}
        </div>
        <div className='h-10 self-end items-center flex gap-1 text-white'>
          <FaStar color='yellow' /> {show.rating / 10}
        </div>
      </div>
    </div>
  );
};

export default ShowCard;
