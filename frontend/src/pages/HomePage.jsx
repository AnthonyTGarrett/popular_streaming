import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ShowList from '../components/ShowList';

const HomePage = () => {
  const [formData, setFormData] = useState({
    country: 'us',
    catalogs: [],
    genres: [],
    keyword: '',
    showType: null,
    orderBy: 'popularity_alltime',
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
        console.log(newFormData);
        return newFormData;
      });
      return;
    }

    setFormData(oldFormData => ({ ...oldFormData, [name]: value }));
  };

  return (
    <>
      <main className='grid grid-cols-1 sm:grid-cols-[25%_75%] md:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] xl:grid-cols-[20%_80%] gap-1.5 text-white pt-[150px]'>
        <Sidebar formData={formData} onFormChange={onFormChange} />
        <ShowList formData={formData} onFormChange={onFormChange} />
      </main>
    </>
  );
};

export default HomePage;
