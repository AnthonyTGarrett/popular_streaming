import React from 'react';
import Sidebar from '../components/Sidebar';
import ShowList from '../components/ShowList';

const HomePage = () => {
  return (
    <main className='grid grid-cols-1 md:grid-cols-[20%_80%] gap-1.5 text-white pt-[150px]'>
      <Sidebar />
      <ShowList />
    </main>
  );
};

export default HomePage;
