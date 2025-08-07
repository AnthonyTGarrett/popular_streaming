import { createContext, useContext, useState, useEffect } from 'react';

const WatchContext = createContext();

// Custom Hook and Context API with functions to manipulate the state
const WatchProvider = ({ children }) => {
  const [watched, setWatched] = useState([]);
  const [watching, setWatching] = useState([]);

  const [syncVar, setSyncVar] = useState(1);

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
  }, [syncVar]);

  const addWatched = async imdbId => {
    if (token) {
      const fetchData = async () => {
        try {
          const url = 'http://localhost:8080/users/addWatchedShow';

          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({ imdbId }),
          });
          const data = await res.json();
          setWatched(watched);
        } catch (error) {
          console.error('Something is broken', error);
        }
      };
      fetchData();
    }
  };

  const delWatched = async imdbId => {
    if (token) {
      const fetchData = async () => {
        try {
          const url = 'http://localhost:8080/users/delWatchedShow';

          const res = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({ imdbId }),
          });
          const data = await res.json();
          setWatched(watched);
        } catch (error) {
          console.error('Something is broken', error);
        }
      };
      fetchData();
    }
  };

  const addWatching = async imdbId => {
    if (token) {
      const fetchData = async () => {
        try {
          const url = 'http://localhost:8080/users/addWatchListShow';

          const res = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({ imdbId }),
          });
          const data = await res.json();
          setWatched(watched);
        } catch (error) {
          console.error('Something is broken', error);
        }
      };
      fetchData();
    }
  };

  const delWatching = async imdbId => {
    if (token) {
      const fetchData = async () => {
        try {
          const url = 'http://localhost:8080/users/delWatchListShow';

          const res = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({ imdbId }),
          });
          const data = await res.json();
          setWatched(watched);
        } catch (error) {
          console.error('Something is broken', error);
        }
      };
      fetchData();
    }
  };

  return (
    <WatchContext.Provider
      value={{
        setSyncVar,
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
