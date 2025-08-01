import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import ShowList from '../components/ShowList';
import MainHeader from '../components/MainHeader';

const HomePage = () => {
  const initialState = {
    country: 'us',
    catalogs: [],
    genres: [],
    keyword: '',
    showType: null,
    orderBy: 'popularity_alltime',
  };

  const [formData, setFormData] = useState(() => {
    try {
      const storedData = localStorage.getItem('storedForm');
      return storedData ? JSON.parse(storedData) : initialState;
    } catch (err) {
      console.log('Error retrieving data from storage', err);
      return initialState;
    }
  });

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
      <main className='grid grid-cols-1 sm:grid-cols-[25%_75%] md:grid-cols-[35%_65%] lg:grid-cols-[35%_65%] xl:grid-cols-[20%_80%] gap-1.5 text-white pt-[50px] mb-10 min-h-[100vh]'>
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
