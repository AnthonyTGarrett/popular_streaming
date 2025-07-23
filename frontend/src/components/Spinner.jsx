import React from 'react';
import { ClipLoader } from 'react-spinners';

const Spinner = ({ loading }) => {
  const override = {
    display: 'block',
    margin: '200px auto',
  };
  return (
    <ClipLoader
      color='##E0115F'
      loading={loading}
      cssOverride={override}
      size={150}
    />
  );
};

export default Spinner;
