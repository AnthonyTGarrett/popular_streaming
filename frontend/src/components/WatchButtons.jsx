import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { useWatch } from '../hooks/WatchProvider';

/**
 * A React Component that controls the buttons on the single page display so that they display correctly when the user is logged in / logged out and based on if the show is in the users shows watched or shows to watch list
 * @returns The rendered component.
 */
const WatchButtons = ({ show }) => {
  const [seen, setSeen] = useState(false);
  const [watchList, setWatchList] = useState(false);

  const WatchLists = useWatch();

  // Pulling values from the context API
  const { setSyncVar, watched, watching } = WatchLists;

  // Functions that correspond to button functions to make changes to the variables in the context API
  const addToWatched = id => {
    WatchLists.addWatched(id);
    setSyncVar(prev => prev + 1);
  };
  const removeFromWatched = id => {
    WatchLists.delWatched(id);
    setSyncVar(prev => prev + 1);
  };
  const addToWatchList = id => {
    WatchLists.addWatching(id);
    setSyncVar(prev => prev + 1);
  };
  const removeFromWatchList = id => {
    WatchLists.delWatching(id);
    setSyncVar(prev => prev + 1);
  };

  // Switch to control button clicks based on the current states
  const handleClicks = e => {
    e.preventDefault();

    switch (e.target.dataset.event) {
      case 'markSeen':
        setSeen(true);
        setWatchList(false);
        addToWatched(show.imdbId);
        break;
      case 'markNotSeen':
        removeFromWatched(show.imdbId);
        setSeen(false);
        break;
      case 'markWatching':
        addToWatchList(show.imdbId);
        setWatchList(true);
        setSeen(false);
        break;
      case 'markNotWatching':
        removeFromWatchList(show.imdbId);
        setWatchList(false);
        break;
      default:
        console.log('Things have went very wrong.');
    }
  };

  useEffect(() => {
    setSeen(watched?.Shows?.find(obj => obj.imdbId === show.imdbId));

    setWatchList(watching?.Shows?.find(obj => obj.imdbId === show.imdbId));
  }, []);

  return (
    <>
      {watchList ? (
        <button
          className='w-full cursor-pointer rounded-lg border-1 border-gray-200
   py-1 px-2 font-bold text-gray-100 transition-colors duration-200 ease-in-out bg-[#333] text-xs md:text-sm text-center block'
          data-event='markNotWatching'
          onClick={handleClicks}
        >
          Remove from WatchList
        </button>
      ) : (
        <button
          className='w-full cursor-pointer rounded-lg border-1 border-gray-200
   py-1 px-2 font-bold text-gray-100 transition-colors duration-200 ease-in-out bg-[#e0115f] text-xs md:text-sm text-center block'
          data-event='markWatching'
          onClick={handleClicks}
        >
          Add to WatchList
        </button>
      )}
      {seen ? (
        <button
          className='cursor-pointer rounded-lg border-1 border-gray-200
   py-1 px-2 font-bold text-gray-100 transition-colors duration-200 ease-in-out bg-[#333] text-xs md:text-sm text-center flex justify-center items-center gap-2'
          data-event='markNotSeen'
          onClick={handleClicks}
        >
          Mark as Not Seen <FaCheck color='green' />
        </button>
      ) : (
        <button
          className='cursor-pointer rounded-lg border-1 border-gray-200
   py-1 px-2 font-bold text-gray-100 transition-colors duration-200 ease-in-out bg-[#e0115f] text-xs md:text-sm text-center block'
          data-event='markSeen'
          onClick={handleClicks}
        >
          Mark As Seen
        </button>
      )}
    </>
  );
};

export default WatchButtons;
