import React from 'react';

const Checkbox = ({ genre, formData, onFormChange }) => {
  return (
    <div>
      <input
        type='checkbox'
        className='appearance-none peer hidden'
        name='genres'
        id={genre.id}
        value={genre.name}
        checked={formData.genres.includes(genre.name)}
        onChange={onFormChange}
      ></input>
      <label
        htmlFor={genre.id}
        className='cursor-pointer rounded-lg border-1 border-gray-200
   py-2 px-4 font-bold text-gray-100 transition-colors duration-200 ease-in-out peer-checked:bg-[#e0115f] peer-checked:text-gray-100 peer-checked:border-gray-200 text-center block'
      >
        {genre.id}
      </label>
    </div>
  );
};

export default Checkbox;
