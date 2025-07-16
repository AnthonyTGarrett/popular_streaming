import React, { useEffect, useState } from 'react';

const ShowSingle = ({ id }) => {
  const [show, setShow] = useState({});

  useEffect(() => {
    const fetchShowData = async () => {
      try {
        const url = `http://localhost:8080/api/${id}`;

        const res = await fetch(url);
        const data = await res.json();
        setShow(data);
      } catch (error) {
        console.error('Something is broken', error);
      }
    };
    fetchShowData();
  }, []);

  return (
    <>
      <h1 className='text-center text-5xl'>{show.title}</h1>
      <div>ShowSingle {show.imdbId}</div>
    </>
  );
};

export default ShowSingle;
