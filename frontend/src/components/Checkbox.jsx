import React from 'react';

const Checkbox = ({ genre }) => {
  return (
    <>
      <input
        type='checkbox'
        className='appearance-none peer hidden'
        name='genres'
        id={genre.id}
      ></input>
      <label
        htmlFor={genre.id}
        className='select-none cursor-pointer rounded-lg border-1 border-gray-200
   py-3 px-6 font-bold text-gray-100 transition-colors duration-200 ease-in-out peer-checked:bg-[#e0115f] peer-checked:text-gray-100 peer-checked:border-gray-200 text-center'
      >
        {genre.id.toUpperCase()}
      </label>
    </>
  );
};

export default Checkbox;
