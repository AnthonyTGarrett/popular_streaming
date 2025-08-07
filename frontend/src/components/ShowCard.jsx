import React from 'react';
import { FaStar } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

/**
 * A React Component that displays the card that shows the show image and a small amount of information
 * @returns The rendered component.
 */
const ShowCard = ({ show, seen = false, watching = false }) => {
  const navigate = useNavigate();
  let image = '';
  if (show.imageSet) {
    image = show.imageSet.verticalPoster.w360;
  } else {
    image = show.image;
  }

  // Passing a state of the imdbId to the /show route to display the individual show that is on the card
  const displaySingle = () => {
    navigate('/show', { state: { id: show.imdbId } });
  };

  return (
    <div
      className={`flex flex-col p-3 rounded-md justify-between bg-black hover:bg-[#444] hover:rounded cursor-pointer hover:shadow-2xl transition-all duration-250 relative ${
        watching ? 'watching' : ''
      }`}
      onClick={displaySingle}
    >
      {seen ? (
        <>
          <span className='watched-text'>Watched</span>{' '}
        </>
      ) : (
        ''
      )}
      <img src={image} className={`h-[85%] ${seen ? 'grayscale' : ''}`}></img>
      <div
        className={`flex h-10 justify-between items-center px-2.5 ${
          seen ? 'grayscale' : ''
        }`}
      >
        <div className='self-end flex pb-2.5 text-white'>
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
