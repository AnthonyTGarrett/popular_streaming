import React, { useEffect, useRef, useState } from 'react';
import ShowCard from './ShowCard';
import Spinner from './Spinner';

const ShowList = ({ formData, onFormChange }) => {
  const [shows, setShows] = useState([]);
  const firstRender = useRef(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/search/filters/';
        // const postData = {
        //   country: 'us',
        //   showType: 'movie',
        //   orderBy: 'rating',
        // };
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

  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }
  //   const fetchData = async () => {
  //     try {
  //       const url = 'http://localhost:8080/api/search/filters/';
  //       const postData = {
  //         country: 'us',
  //         catalogs: ['netflix', 'prime'],
  //         keyword: 'zombie',
  //         showType: 'movie',
  //         orderBy: 'rating',
  //       };
  //       const res = await fetch(url, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(postData),
  //       });
  //       const data = await res.json();
  //       setShows(data.shows);
  //     } catch (error) {
  //       console.error('Something is broken', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          <div className='p-2 md:p-4 lg:p-6 xl:p-8 mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5'>
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
