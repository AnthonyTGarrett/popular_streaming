import React from 'react';

function capitalizeIt(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const MainHeader = ({ formData }) => {
  return (
    <div className='text-white text-4xl translate-y-[50px] md:translate-y-[100px] xl:translate-y-[180px] hidden lg:block lg:left-[35%] xl:left-[25%] absolute'>
      Popular{' '}
      {formData.showType === 'movie'
        ? capitalizeIt(formData.showType) + 's'
        : formData.showType === 'series'
        ? 'TV ' + capitalizeIt(formData.showType)
        : 'Shows'}{' '}
      This Month{' '}
      {formData.catalogs[0]
        ? ' On ' + capitalizeIt(formData.catalogs[0])
        : 'on Streaming'}
    </div>
  );
};

export default MainHeader;
