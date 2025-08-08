import React from 'react';
import WatchList from '../components/WatchList';
import Watched from '../components/Watched';

// Setup of the basic page of the logged in user to view their watch lists
const Dashboard = () => {
  return (
    <div className='mx-auto w-[80vw] mt-20 p-3'>
      <WatchList />
      <Watched seen={true} />
    </div>
  );
};

export default Dashboard;
