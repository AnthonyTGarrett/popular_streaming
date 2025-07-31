import React, { useState } from 'react';
import { useEffect } from 'react';
import ShowCard from './ShowCard';
import { Link } from 'react-router-dom';

const Watched = ({ seen }) => {
  const [shows, setShows] = useState([]);

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

        setShows(data.Shows);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <h2 className='text-white text-3xl my-10'>Shows Watched</h2>
      <section className='min-h-[45vh] grid grid-cols-1 auto-rows-max md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5 mb-10'>
        {shows ? (
          shows.map((show, index) => (
            <ShowCard key={index} show={show} seen={seen} />
          ))
        ) : (
          <p className='text-2xl mt-20 text-center text-white flex flex-col'>
            No results found.
            <Link to='/home' className='text-lg text-[#e0115f] mt-5 underline'>
              Add some Shows Now!
            </Link>
          </p>
        )}
      </section>
    </>
  );
};

export default Watched;
