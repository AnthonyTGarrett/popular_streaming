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
    orderBy: 'rating',
  });

  const onFormChange = event => {
    // event.preventDefault();
    const { name, value } = event.target;
    if (name === 'showType' && !value) {
      setFormData(oldFormData => ({ ...oldFormData, [name]: null }));
      return;
    }

    setFormData(oldFormData => ({ ...oldFormData, [name]: value }));
  };

  return (
    <main className='grid grid-cols-1 sm:grid-cols-[25%_75%] md:grid-cols-[35%_65%] lg:grid-cols-[30%_70%] xl:grid-cols-[20%_80%] gap-1.5 text-white pt-[150px]'>
      <Sidebar formData={formData} onFormChange={onFormChange} />
      <ShowList formData={formData} onFormChange={onFormChange} />
    </main>
  );
};

export default HomePage;
