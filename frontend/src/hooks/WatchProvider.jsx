import { createContext, useContext, useState, useEffect } from 'react';

const WatchContext = createContext();

const WatchProvider = ({ children }) => {
  const [watched, setWatched] = useState([]);
  const [watching, setWatching] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const watchedUrl = 'http://localhost:8080/users/watched';

          const watchedResponse = await fetch(watchedUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
          const watchedData = await watchedResponse.json();
          setWatched(watchedData);

          const watchingUrl = 'http://localhost:8080/users/watchList';
          const res = await fetch(watchingUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });
          const watchingData = await res.json();
          setWatching(watchingData);
        } catch (error) {
          console.error('Something is broken', error);
        }
      };
      fetchData();
    } else {
      setWatched(null);
      setWatching(null);
    }
  }, []);

  const addWatched = async () => {};

  const delWatched = async () => {};

  const addWatching = async () => {};

  const delWatching = async () => {};

  return (
    <WatchContext.Provider
      value={{
        watched,
        watching,
        addWatched,
        delWatched,
        addWatching,
        delWatching,
      }}
    >
      {children}
    </WatchContext.Provider>
  );
};

export default WatchProvider;

export const useWatch = () => {
  return useContext(WatchContext);
};
