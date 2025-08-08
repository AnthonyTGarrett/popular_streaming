import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ShowList from '../components/ShowList';
import MainHeader from '../components/MainHeader';

/**
 * A React Page that is used as a regular component to store the formData and the fonmchange and submit functions. These are passed down to the navbar and the showlist to display information based on the sidebar form data
 * @returns The rendered component.
 */
const HomePage = () => {
  const initialState = {
    country: 'us',
    catalogs: [],
    genres: [],
    keyword: '',
    showType: null,
    orderBy: 'popularity_alltime',
  };

  // Lifted the state variables from the sidebar and show list to the homepage so that they are available from both
  const [formData, setFormData] = useState(() => {
    try {
      const storedData = localStorage.getItem('storedForm');
      return storedData ? JSON.parse(storedData) : initialState;
    } catch (err) {
      console.log('Error retrieving data from storage', err);
      return initialState;
    }
  });

  // Function to change the formData based on any user changes to the form on the sidebar
  const onFormChange = event => {
    const { name, value, checked } = event.target;
    if (name === 'showType' && !value) {
      setFormData(oldFormData => ({ ...oldFormData, [name]: null }));
      return;
    }

    if (name === 'catalogs') {
      setFormData(oldFormData => ({ ...oldFormData, [name]: [value] }));
      return;
    }

    if (name === 'genres') {
      setFormData(oldFormData => {
        const newFormData = { ...oldFormData };

        if (checked) {
          newFormData.genres = [...oldFormData.genres, value];
        } else {
          newFormData.genres = oldFormData.genres.filter(
            genre => genre !== value
          );
        }
        return newFormData;
      });
      return;
    }
    if (name === 'keyword') {
      return;
    }

    setFormData(oldFormData => ({ ...oldFormData, [name]: value }));
  };

  // Handles the event when the user submits the formData
  const onFormSubmit = event => {
    event.preventDefault();

    const { name, value } = event.target[0];

    setFormData(oldFormData => ({ ...oldFormData, [name]: value }));
  };

  useEffect(() => {
    localStorage.setItem('storedForm', JSON.stringify(formData));
  }, [formData]);

  return (
    <>
      <MainHeader formData={formData} />
      <main className='grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[35%_65%] xl:grid-cols-[25%_75%] 2xl:xl:grid-cols-[20%_80%] gap-1.5 text-white pt-[50px] mb-10 min-h-[100vh]'>
        <Sidebar
          setFormData={setFormData}
          formData={formData}
          onFormChange={onFormChange}
          onFormSubmit={onFormSubmit}
        />
        <ShowList formData={formData} onFormChange={onFormChange} />
      </main>
    </>
  );
};

export default HomePage;
