import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaSearch } from "react-icons/fa"
import axiosInstance from '../constant/Backend/axiosInstance';
import CardItems from '../component/CardItems';
import { useDispatch, useSelector } from 'react-redux';

const Search = () => {


    const [isSearch, setIsSearch] = useState(false);
    const [location, setLocation] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [propertyType, setPropertyType] = useState('');
    const [status, setStatus] = useState('');
    const [SearchProperties, setSearchProperties] = useState([]);
    const { properties , loading, error} = useSelector((state) => state.property);


    const handleSearch = async(e) => {
        e.preventDefault();

        try {

            const res = await axiosInstance.get('/api/property/getSearchProperty', {
                params : { location, minPrice, maxPrice, propertyType, status }
            });

            if(res.data.success !== true) {
                toast.error(res.data.message);
            }

            toast.success(res.data.message);
            setIsSearch(true);
            setSearchProperties(res.data.properties);
            
        } catch (error) {
            toast.error(error.message);
        }
    };


  return (
    <div className='w-full h-full'>
        <div className='relative overflow-x-hidden flex w-full md:px-10 md:py-4
        scrollbar-none scroll-smooth shadow-2xl shadow-gray-800'>
          <div className='w-full opacity-40'>
          <img className='min-w-full h-[280px] md:h-[410px] object-cover md:object-center
             mr-5 rounded-md transition-all duration-100 ease-in' alt='searchBanner' loading='lazy'
             src={"https://wallpapers.com/images/hd/real-estate-digital-art-0kmi22tcj2x60lim.jpg"} /> 
          </div>

          <div className='absolute flex justify-center items-center top-24 md:top-44 px-5 md:px-8 md:-ml-8 w-full font-mono'>
            <div className='relative flex justify-center items-center w-[350px] md:w-[950px] '>
             <input className='relative search w-full h-12 rounded-md text-black md:text-xl bg-slate-100 
             text-sm text-start px-2 md:text-center placeholder:text-slate-900'
              placeholder='Search for properties'
              type='text'
            //   value={query}
            //   onChange={(e) => setQuery(e.target.value)} 
              onKeyDown={(e) => {
               e.key === 'Enter' && handleSearch();
              }}
              />
             <button className='absolute right-0  p-4 h-12 w-12 focus:outline-none border-none rounded-md top-[0px] bg-orange-700'
             onClick={handleSearch}>
               <FaSearch className='text-lg md:text-xl  text-slate-900'/>
            </button>
            </div>
        </div>
        </div>
       

        <div className='grid grid-cols-5 justify-end items-center px-5 ml-10 gap-5 mt-5 w-full'>

          <div className='relative w-[100px]bg-red-500'>
            <select className=' bg-[#090e3db0] border border-red-400 rounded-md w-[100px] md:w-[200px] h-[30px] md:h-[30px] cursor-pointer text-center 
            hover:bg-slate-100 hover:text-red-500 md:text-xl' 
            value={location}
             onChange={(e) => setLocation(e.target.value)}>
             <option value="">Select City</option>   
             <option value="Chennai">Chennai</option>
             <option value="Mumbai">Mumbai</option>
             <option value="Tricky">Tricky</option>
            </select>
          </div>

          <div className='relative w-[100px]bg-red-500'>
            <select className=' bg-[#090e3db0] border border-red-400 rounded-md w-[100px] md:w-[200px] h-[30px] md:h-[30px] cursor-pointer text-center 
           hover:bg-slate-100 hover:text-red-500 md:text-xl'
             value={maxPrice}
             onChange={(e) => setMinPrice(e.target.value) }>
             <option value="">Select Maximum price</option>
             <option value="100000">100000</option>
             <option value="10000">10000 </option>
             <option value="1000">10000 </option>
            </select>
          </div>

          <div className='relative w-[100px]bg-red-500'>
            <select className=' bg-[#090e3db0] border border-red-400 rounded-md w-[100px] md:w-[200px] h-[30px] md:h-[30px] cursor-pointer text-center 
           hover:bg-slate-100 hover:text-red-500 md:text-xl'
           value={minPrice}
           onChange={(e) => setMaxPrice(e.target.value)}>
             <option value="">Select Minimum price</option>
             <option value="10000">10000 </option>
             <option value="1000">1000 </option>
            </select>
          </div>

          <div className='relative w-[100px]bg-red-500'>
            <select className=' bg-[#090e3db0] border border-red-400 rounded-md w-[100px] md:w-[200px] h-[30px] md:h-[30px] cursor-pointer text-center 
           hover:bg-slate-100 hover:text-red-500 md:text-xl'
           value={propertyType}
           onChange={(e) => setPropertyType(e.target.value)}>
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
            </select>
          </div>

          <div className='relative w-[100px]bg-red-500'>
            <select className=' bg-[#090e3db0] border border-red-400 rounded-md w-[100px] md:w-[200px] h-[30px] md:h-[30px] cursor-pointer text-center 
           hover:bg-slate-100 hover:text-red-500 md:text-xl'
           value={status}
           onChange={(e) => setStatus(e.target.value)}>
              <option value="">Status</option>
              <option value="Sold">Sold</option>
              <option value="Not Sold">Not Sold</option>
            </select>
          </div>

        </div>


        <div className='flex justify-center items-center mt-5'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {
                SearchProperties.length > 0 ? (
                    <>
                    {
                    SearchProperties.map((item) => (
                        <CardItems item={item} />
                    ))
                     }
                    </>
                    ) : (
                    <>
                      {
                        properties.map((item) => (
                          <CardItems item={item} />
                        ))
                      }    
                    </>
                    )
            }
        </div>
        </div>
    </div>
  )
}

export default Search