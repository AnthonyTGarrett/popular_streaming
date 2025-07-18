import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';
import Spinner from './Spinner';

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const [topSeriesData, settopSeriesData] = useState({});
  const [topMoviesData, settopMoviesData] = useState({});
  const [loading, setLoading] = useState(true);

  const seriesApiURLs = [
    'http://localhost:8080/api/top/series/netflix',
    'http://localhost:8080/api/top/series/prime',
    'http://localhost:8080/api/top/series/disney',
    'http://localhost:8080/api/top/series/apple',
    'http://localhost:8080/api/top/series/hbo',
  ];

  const moviesApiURLs = [
    'http://localhost:8080/api/top/movies/netflix',
    'http://localhost:8080/api/top/movies/prime',
    'http://localhost:8080/api/top/movies/disney',
    'http://localhost:8080/api/top/movies/apple',
    'http://localhost:8080/api/top/movies/hbo',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // for (const url of seriesApiURLs) {
        //   const res = await fetch(url);
        //   const data = await res.json();
        //   const service = url.split('/')[url.length - 1];
        //   if (data) {
        //     settopSeriesData({ ...topSeriesData, [service]: data });
        //   }
        // }

        // for (const url of moviesApiURLs) {
        //   const res = await fetch(url);
        //   const data = await res.json();
        //   const service = url.split('/')[url.length - 1];
        //   settopMoviesData(data);
        // }
        const netflixSeries = await fetch(seriesApiURLs[0]);
        const primeSeries = await fetch(seriesApiURLs[1]);
        const disneySeries = await fetch(seriesApiURLs[2]);
        const appleSeries = await fetch(seriesApiURLs[3]);
        const hboSeries = await fetch(seriesApiURLs[4]);

        Promise.all([
          netflixSeries,
          primeSeries,
          disneySeries,
          appleSeries,
          hboSeries,
        ]).then(values => {
          console.log(values[0]);
        });
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
