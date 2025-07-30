import React, { useState, useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { useWatch } from '../hooks/WatchProvider';

const WatchButtons = ({ show }) => {
  const [watched, setWatched] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [seen, setSeen] = useState(false);
  const [watching, setWatching] = useState(false);
  const WatchLists = useWatch();

  const addToWatched = id => {
    WatchLists.addWatched(id);
  };
  const removeFromWatched = id => {
    WatchLists.delWatched(id);
  };
  const addToWatchList = id => {
    WatchLists.addWatching(id);
  };
  const removeFromWatchList = id => {
    WatchLists.delWatching(id);
  };

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
        setWatching(true);
        setSeen(false);
        break;
      case 'markNotWatching':
        removeFromWatchList(show.imdbId);
        setWatching(false);
        break;
      default:
        console.log('Things have went very wrong.');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/users/watched';

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        const data = await res.json();

        setWatched(data.Shows);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/users/watchList';

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        const data = await res.json();

        setWatchList(data.Shows);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {watching ? (
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
   py-1 px-2 font-bold text-gray-100 transition-colors duration-200 ease-in-out bg-[#33] text-xs md:text-sm text-center flex justify-center items-center gap-2'
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
