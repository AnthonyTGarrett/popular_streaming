import React from 'react';

const popularities = {
  popularity_alltime: 'Popular All Time',
  popularity_1year: 'Popular This Year',
  popularity_1month: 'Popular This Month',
  popularity_1week: 'Popular This Week',
  rating: 'Highest Rated',
};

const capitalizeIt = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const chooseYourHeading = formData => {
  const wordArr = popularities[formData.orderBy].split(' ');
  if (formData.showType === null) {
    wordArr.splice(1, 0, 'Shows');
  } else {
    wordArr.splice(
      1,
      0,
      formData.showType === 'movie'
        ? capitalizeIt(formData.showType) + 's'
        : capitalizeIt(formData.showType)
    );
  }
  if (!formData.catalogs[0]) {
    wordArr.push('On Streaming');
  } else {
    wordArr.push('On ' + capitalizeIt(formData.catalogs[0]));
  }
  if (formData.orderBy === 'rating') {
    [wordArr[1], wordArr[2]] = [wordArr[2], wordArr[1]];
  }

  return wordArr.join(' ');
};

const MainHeader = ({ formData }) => {
  return (
    <div className='text-white text-4xl translate-y-[50px] md:translate-y-[50px] xl:translate-y-[100px] hidden lg:block lg:left-[35%] xl:left-[25%] absolute'>
      {chooseYourHeading(formData)}
    </div>
  );
};

export default MainHeader;
