import React, { useState } from 'react';
import { useEffect } from 'react';
import ShowCard from './ShowCard';

const Watched = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    console.log(user);
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
      <h2 className='text-white text-3xl mb-15'>Shows Already Watched</h2>
      <section className='min-h-[45vh] grid grid-cols-3 gap-5'>
        {shows.length > 0 ? (
          shows.map((show, index) => (
            <ShowCard key={index} show={show} seen={true} />
          ))
        ) : (
          <p className='text-2xl mt-20 text-center text-white'>
            No results found.
          </p>
        )}
      </section>
    </>
  );
};

export default Watched;
