import Checkbox from './Checkbox';
import genres from '../assets/genres';

const Sidebar = () => {
  return (
    <aside className='h-full px-1 pt-25 bg-black grid grid-cols-1'>
      <form className='flex flex-col items-center'>
        <div className='mb-5'>
          <label htmlFor='keyword'>Find something to watch</label>
          <input
            type='text'
            name='keyword'
            id='keyword'
            placeholder='What to watch...'
            className='bg-[#2c2c2c] border border-[#E0115F] rounded-lg focus:ring-2 focus:ring-[#E0115F] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
          />
        </div>
        <div className='mb-5'>
          <div className='flex space-x-2 mt-3'>
            <div className='relative'>
              <input
                type='radio'
                id='all'
                name='options'
                value='all'
                className='hidden peer'
                defaultChecked
              />
              <label
                htmlFor='all'
                className='px-4 py-2 rounded-md border border-gray-300 cursor-pointer peer-checked:bg-[#e0115f] peer-checked:text-white'
              >
                All
              </label>
            </div>
            <div className='relative'>
              <input
                type='radio'
                id='movies'
                name='options'
                value='movies'
                className='peer hidden'
              />
              <label
                htmlFor='movies'
                className='px-4 py-2 rounded-md border border-gray-300 cursor-pointer peer-checked:bg-[#e0115f] peer-checked:text-white'
              >
                Movies
              </label>
            </div>
            <div className='relative'>
              <input
                type='radio'
                id='series'
                name='options'
                value='series'
                className='peer hidden'
              />
              <label
                htmlFor='series'
                className='px-4 py-2 rounded-md border border-gray-300 cursor-pointer peer-checked:bg-[#e0115f] peer-checked:text-white'
              >
                TV Shows
              </label>
            </div>
          </div>
        </div>
        <div className='mb-5 mt-8'>
          <label htmlFor='service'>Streaming Service</label>
          <select
            id='service'
            class='bg-[#2c2c2c] border border-gray-300 text-gray-100 text-md rounded-lg focus:ring-2 focus:ring-[#e0115f] focus:border-[#e0115f] block w-60 lg:w-full py-1 px-2 mb-8 '
          >
            <option selected value='all'>
              All Services
            </option>
            <option value='netflix'>Netflix</option>
            <option value='prime'>Prime Video</option>
            <option value='disney'>Disney +</option>
            <option value='hbo'>Max</option>
            <option value='hulu'>Hulu</option>
            <option value='apple'>Apple TV</option>
            <option value='peacock'>Peacock</option>
            <option value='paramount'>Paramount +</option>
            <option value='starz'>Starz</option>
            <option value='curiosity'>Curiosity</option>
            <option value='discovery'>Discovery</option>
            <option value='plutotv'>Pluto TV</option>
            <option value='tubi'>Tubi</option>
          </select>
        </div>
        <div className='hidden lg:grid mb-5 grid-cols-[50%_50%] gap-y-3 gap-x-2'>
          {genres.map((genre, index) => (
            <Checkbox key={index} genre={genre} />
          ))}
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;
