import React, { useEffect, useState } from 'react';
import ShowCard from './ShowCard';
import Spinner from './Spinner';
import { useWatch } from '../hooks/WatchProvider';

const ShowList = ({ formData }) => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  let seen = false;
  let watching = false;

  const watchLists = useWatch();

  const { setSyncVar } = watchLists;

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
    setSyncVar(prev => prev + 1);
  }, [formData]);

  return (
    <>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <>
          {console.log(shows)}
          <div className='p-2 md:p-4 lg:p-6 xl:p-8 mt-5 xl:mt-20 grid grid-cols-1 auto-rows-max md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5'>
            {shows.length > 0 ? (
              shows.map((show, index) => {
                if (watchLists) {
                  seen = watchLists?.watched?.Shows?.find(
                    obj => obj.imdbId === show.imdbId
                  );
                }

                if (watchLists) {
                  watching = watchLists?.watching?.Shows?.find(
                    obj => obj.imdbId === show.imdbId
                  );
                }

                return (
                  <ShowCard
                    key={index}
                    show={show}
                    seen={seen}
                    watching={watching}
                  />
                );
              })
            ) : (
              <p className='text-2xl mt-10 text-center'>No results found.</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ShowList;
