import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';
import Spinner from './Spinner';

const ShowList = ({ formData }) => {
  const [shows, setShows] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/search/filters/';

        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        setShows(data);
      } catch (error) {
        console.error('Something is broken', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [formData]);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          <div className='p-2 md:p-4 lg:p-6 xl:p-8 mt-5 xl:mt-20 grid grid-cols-1 auto-rows-max md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5'>
            {shows.map((show, index) => (
              <ShowCard key={index} show={show} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ShowList;
