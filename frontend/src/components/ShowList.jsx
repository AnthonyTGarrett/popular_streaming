import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';
import Spinner from './Spinner';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch (error) {
        console.error('Something is broken', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //   useEffect(() => {
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
      {/* {loading ? (
        <Spinner loading={loading} />
      ) : (
        <div className='p-2 md:p-4 lg:p-6 xl:p-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5'>
          {topMoviesData.map((show, index) => (
            <ShowCard key={index} show={show} />
          ))}
        </div>
      )} */}
    </>
  );
};

export default ShowList;
