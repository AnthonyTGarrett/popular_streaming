import React from 'react';
import WatchList from '../components/WatchList';
import Watched from '../components/Watched';

const Dashboard = () => {
  return (
    <div className='mx-auto w-[80vw] mt-20 p-3'>
      <WatchList />
      <Watched />
    </div>
  );
};

export default Dashboard;
