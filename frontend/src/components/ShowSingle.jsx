import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const ShowSingle = ({ id }) => {
  const [show, setShow] = useState({});
  const [loading, setLoading] = useState(true);
  let isLoggedIn = false;

  if (localStorage.getItem('user')) {
    isLoggedIn = true;
  }

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const url = `http://localhost:8080/api/${id}`;

        const res = await fetch(url);
        const data = await res.json();

        setShow(data);
      } catch (error) {
        console.error('Something is broken', error);
      } finally {
        setLoading(false);
      }
    };
    fetchShowData();
  }, []);

  return (
    <>
      <h1 className='text-center text-2xl md:text-4xl lg:text-5xl'>
        {show.title}
      </h1>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className='mx-auto flex flex-col w-full md:w-4/6 lg:w-3/6 2xl:w-2/6 mt-8 mb-20'>
          <img src={show.imageSet.horizontalPoster.w720}></img>
          <p className='text-center text-gray-500'>
            {show.genres.map((genre, index) => (
              <span key={index} className='text-xl'>
                {index === show.genres.length - 1
                  ? genre.name
                  : genre.name + ', '}
              </span>
            ))}
          </p>

          <div className='grid grid-cols-2 p-4 gap-13 mt-4'>
            <h3 className='text-lg md:text-xl self-end underline underline-offset-4'>
              Overview
            </h3>
            {isLoggedIn ? (
              <>
                {' '}
                <button
                  className='cursor-pointer rounded-lg border-1 border-gray-200
   py-1 px-2 font-bold text-gray-100 transition-colors duration-200 ease-in-out bg-[#e0115f] text-xs md:text-sm text-center block'
                >
                  Add to WatchList
                </button>
                <button
                  className='cursor-pointer rounded-lg border-1 border-gray-200
   py-1 px-2 font-bold text-gray-100 transition-colors duration-200 ease-in-out bg-[#e0115f] text-xs md:text-sm text-center block'
                >
                  Mark As Seen
                </button>{' '}
              </>
            ) : (
              <button
                className='cursor-pointer rounded-lg border-1 border-gray-200
   py-1 px-2 font-bold text-gray-100 transition-colors duration-200 ease-in-out bg-[#e0115f] text-xs md:text-sm text-center block mx-4 self-auto'
              >
                <Link to='/login'>Login to Track Shows</Link>
              </button>
            )}
          </div>
          <p className='text-base mt-4 mb-4 text-center lg:text-left'>
            {show.overview}
          </p>
          <div className='grid grid-cols-2 grid-rows-2 gap-2 text-xl mt-8 w-[90%] mx-auto mb-4'>
            <p className='self-start text-sm md:text-base'>
              <strong>Rating: </strong>
              {show.rating / 10}
            </p>
            <p className='text-right text-sm md:text-base'>
              {show.showType === 'series' ? (
                <strong>Seasons: {show.seasonCount}</strong>
              ) : (
                <strong>Runtime: {show.runtime} mins</strong>
              )}
            </p>
            <p className=' text-sm md:text-base'>
              <strong>Show Type: </strong>
              {show.showType[0].toUpperCase() + show.showType.slice(1)}
            </p>
            <p className='text-right text-sm md:text-base'>
              {show.releaseYear ? show.releaseYear : show.firstAirYear}
            </p>
          </div>
          <div className=' mt-4 w-[90%]'>
            <h3 className='text-lg md:text-xl underline underline-offset-4 pl-4'>
              Directors
            </h3>
            <p className='text-center text-gray-500 px-2'>
              {show.directors
                ? show.directors.map((director, index) => (
                    <span key={index} className='text-base md:text-xl'>
                      {index === show.directors.length - 1
                        ? director
                        : director + ', '}
                    </span>
                  ))
                : show.creators.map((creator, index) => (
                    <span key={index} className='text-base md:text-xl'>
                      {index === show.creators.length - 1
                        ? creator
                        : creator + ', '}
                    </span>
                  ))}
            </p>
          </div>
          <div className=' mt-8 w-[90%]'>
            <h3 className='text-lg md:text-xl underline underline-offset-4 pl-4'>
              Cast
            </h3>
            <p className='text-center text-gray-500 px-2'>
              {show.cast.map((member, index) => (
                <span key={index} className='text-base md:text-xl'>
                  {index === show.cast.length - 1 ? member : member + ', '}
                </span>
              ))}
            </p>
          </div>
          <div className='p-4 gap-13 mt-4'>
            <h3 className='text-lg md:text-xl self-end underline underline-offset-4 pb-4'>
              Where to Stream
            </h3>
            <div className='flex flex-wrap gap-4 items-center justify-center'>
              <div className='grid grid-cols-3 md:grid-cols-4 row-auto gap-4 place-content-center place-items-center'>
                {show.streamingOptions.us.map((service, index) => (
                  <Link
                    to={service.link}
                    key={index}
                    className='flex flex-col items-center content-center w-[60%]'
                  >
                    <img src={service.service.imageSet.darkThemeImage}></img>
                    <p className='text-base text-center'>
                      {service.type}&nbsp;
                      {service.price ? service.price.formatted : ''}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ShowSingle;
