import React from 'react';
import Sidebar from '../components/Sidebar';
import ShowList from '../components/ShowList';

const HomePage = () => {
  return (
    <main className='grid grid-cols-1 sm:grid-cols-[30%_70%] md:grid-cols-[35%_65%] gap-1.5 text-white pt-[150px]'>
      <Sidebar />
      <ShowList />
    </main>
  );
};

export default HomePage;
