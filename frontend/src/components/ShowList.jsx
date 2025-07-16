import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';

const ShowList = () => {
  // let show = {
  //   imageSet: {
  //     verticalPoster: {
  //       w360: 'https://cdn.movieofthenight.com/show/5667/poster/vertical/en/360.jpg?Expires=1770584236&Signature=C9mAshacOgzPQFKf-iz9A2TVzMXhqi9suVfV~JsQKxc1r-kZTbBLe5TRE-zTDbCpE7pa6-x5v5Dih~BNOC4U3KRHEFo3XokVAFsHCq-q-z5Xab7wt2hN7dLfwCIxPHC4fCBKjr9cCSwlDt671JLIz75HH2Y475CGhcYBIlsqXSKD2LMsF75t-Zt1S09NEMlMvD--DIZzJSzwUXj0lM~rYDEI~bgadrtPmL2X1Hs0S5VkBWQFrVwYI0vzbpOByXcouBh4UKwEa9zQru4SnlE8ypIYj8-5~jpyVYKclvk7mEIpnIYT~ZjUXEm8d9qg0GgXvmkw7~gbhT~uxdi5vBFulA__&Key-Pair-Id=KK4HN3OO4AT5R',
  //     },
  //   },
  //   releaseYear: 1972,
  //   rating: 8.6,
  // };
  const [shows, setShows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:8080/api/search/filters/';
        const postData = {
          country: 'us',
          catalogs: ['netflix', 'prime'],
          keyword: 'zombie',
          showType: 'movie',
          orderBy: 'rating',
        };
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });
        const data = await res.json();
        setShows(data.shows);
      } catch (error) {
        console.error('Something is broken', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='p-2 md:p-4 lg:p-6 xl:p-8  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-5'>
      {shows.map((show, index) => (
        <ShowCard key={index} show={show} />
      ))}
    </div>
  );
};

export default ShowList;
