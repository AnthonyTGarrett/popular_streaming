import Checkbox from './Checkbox';
import genres from '../assets/genres';

const Sidebar = ({ formData, onFormChange, onFormSubmit }) => {
  return (
    <aside className='h-full px-3 pt-8 sm:pt-15 md:pt-25 bg-black grid grid-cols-1'>
      <form className='flex flex-col items-center' onSubmit={onFormSubmit}>
        <div className='mb-5 text-center'>
          <label htmlFor='keyword'>Find something to watch</label>
          <input
            type='text'
            name='keyword'
            onChange={onFormChange}
            id='keyword'
            placeholder='What to watch...'
            className='bg-[#2c2c2c] border border-[#E0115F] rounded-lg focus:ring-2 focus:ring-[#E0115F] focus:outline-none block w-full py-1 px-2 text-gray-300 text-2xl placeholder:text-gray-500 placeholder:text-lg mt-3'
          />
        </div>
        <div className='mb-5'>
          <div className='flex space-x-1 mt-3'>
            <div className='relative'>
              <input
                type='radio'
                id='all'
                name='showType'
                value=''
                className='hidden peer'
                checked={formData.showType === null}
                onChange={onFormChange}
              />
              <label
                htmlFor='all'
                className='px-3 py-2 rounded-md border border-gray-300 cursor-pointer peer-checked:bg-[#e0115f] checked:bg-[#e0115f]peer-checked:text-white'
              >
                All
              </label>
            </div>
            <div className='relative'>
              <input
                type='radio'
                id='movie'
                name='showType'
                value='movie'
                className='peer hidden'
                checked={formData.showType === 'movie'}
                onChange={onFormChange}
              />
              <label
                htmlFor='movie'
                className='px-4 py-2 rounded-md border border-gray-300 cursor-pointer peer-checked:bg-[#e0115f] peer-checked:text-white'
              >
                Movies
              </label>
            </div>
            <div className='relative'>
              <input
                type='radio'
                id='series'
                name='showType'
                value='series'
                className='peer hidden'
                checked={formData.showType === 'series'}
                onChange={onFormChange}
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
        <div className='mb-5 mt-8 text-center w-full lg:w-[80%] mx-auto flex flex-col justify-center items-center'>
          <label htmlFor='service'>Streaming Service</label>
          <select
            id='catalogs'
            name='catalogs'
            value={formData.catalogs[0]}
            onChange={onFormChange}
            className='bg-[#2c2c2c] border border-gray-300 text-gray-100 text-md rounded-lg focus:ring-2 focus:ring-[#e0115f] focus:border-[#e0115f] block w-60 lg:w-[80%] py-1.5 px-2 mb-2 mt-2 text-center'
          >
            <option value=''>All Services</option>
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
        <div className='mb-5 mt-8 text-center w-full lg:w-[80%] mx-auto flex flex-col justify-center items-center'>
          <label htmlFor='order'>Sort Results By:</label>
          <select
            id='orderBy'
            name='orderBy'
            value={formData.orderBy}
            onChange={onFormChange}
            className='bg-[#2c2c2c] border border-gray-300 text-gray-100 text-md rounded-lg focus:ring-2 focus:ring-[#e0115f] focus:border-[#e0115f] block w-60 lg:w-[80%] py-1.5 px-2 mb-8 mt-2 text-center'
          >
            <option value='popularity_alltime'>Popular All Time</option>
            <option value='popularity_1month'>Popular This Month</option>
            <option value='popularity_1week'>Popular This Week</option>
            <option value='popularity_1year'>Popular This Year</option>
            <option value='rating'>Rating</option>
            <option value='release_date'>Release Date</option>
          </select>
        </div>
        <div
          className={`hidden lg:grid mb-5 grid-cols-[50%_50%] gap-y-3 gap-x-2`}
        >
          {genres.map((genre, index) => (
            <Checkbox
              key={index}
              genre={genre}
              formData={formData}
              onFormChange={onFormChange}
            />
          ))}
        </div>
      </form>
    </aside>
  );
};

export default Sidebar;
