import React, { useEffect, useState } from 'react'
import CardItems from '../component/CardItems'
import AddProperty from '../component/Property/AddProperty';
import {propertyInStart, propertyInSuccess, propertyInFailure} from "../features/propertySlice";
import axiosInstance from '../constant/Backend/axiosInstance';
import EditProperty from '../component/Property/EditProperty';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Home = () => {

  const [isShow, setIsShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const { properties , loading, error} = useSelector((state) => state.property);
  const [defaultValue, setDefaultValue] = useState(null);

  // console.log(properties);

  useEffect(() => {

    const fetchProperties = async() => {
      dispatch(propertyInStart());
      try{
         const res = await axiosInstance.get('/api/property/getProperty');

         if(res.data.success !== true){
          dispatch(propertyInFailure(res.data.message));
         };

         dispatch(propertyInSuccess(res.data.properties));

      }catch(e){
        toast.error(e.message);
        dispatch(propertyInFailure(e.message));
      }
    };

    fetchProperties();
  },[isShow, showUpdate, isDelete]);

  // console.log(propertyData);

  let arr = Array(10).fill(0);

  return (
    <div className='w-full h-full px-2 md:px-4 py-3 md:py-6'>
      <div className='flex justify-between items-center px-4 md:px-8 py-2 md:py-4' onClick={() => setIsShow(true)}>
        <h1 className='font-semibold text-xl md:text-4xl'>Top properties</h1>
        <button className='bg-orange-500 text-center p-2 md:p-4 border
         border-gray-200 rounded-md text-base md:text-xl font-semibold'>Create Property</button>
      </div>
      <div className='flex justify-center items-center mt-2'>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
       {
        properties.map(( item, index) => (
          <CardItems item={item} isDelete={isDelete} setIsDelete={setIsDelete}
          setShowUpdate={setShowUpdate} setDefaultValue={setDefaultValue} />
        ))
        }
       </div>
      </div>
      {
        isShow && (
          <AddProperty setIsShow={setIsShow} />
        )
      }

      {
        showUpdate && (
          <EditProperty setShowUpdate={setShowUpdate} defaultValue={defaultValue} />
        )
      }
    </div>
  )
}

export default Home