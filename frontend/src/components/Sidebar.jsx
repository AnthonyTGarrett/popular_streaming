import React from 'react';

const Sidebar = () => {
  return (
    <aside className='border-r h-full px-8 py-2 bg-black grid grid-cols-1'>
      <form class='flex items-center'>
        <div class='mb-5'>
          <label for='keyword'>Find something to watch</label>
          <input
            type='text'
            name='keyword'
            id='keyword'
            placeholder='What to watch...'
            class='bg-[#2c2c2c] border border-[#E0115F] rounded-lg focus:ring-2 focus:ring-[#E0115F] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
          />
        </div>
        <div class='mb-5'>
          <label for='keyword'>Find something to watch</label>
          <input
            type='text'
            name='keyword'
            id='keyword'
            placeholder='What to watch...'
            class='bg-[#2c2c2c] border border-[#E0115F] rounded-lg focus:ring-2 focus:ring-[#E0115F] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
          />
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;
