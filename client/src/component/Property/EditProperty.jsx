import React, {useState} from 'react';
import toast from "react-hot-toast";
import axiosInstance from "../../constant/Backend/axiosInstance"

const EditProperty = ({setShowUpdate, defaultValue}) => {

    const [propertyImg, setPropertyImg] = useState(null);  
    const [type, setType] = useState(defaultValue.propertyType);
    const [location, setLocation] = useState(defaultValue.location);
    const [price, setPrice] = useState(defaultValue.price);
    const [status, setStatus ] = useState(defaultValue.status);
    const [description, setDescription] = useState(defaultValue.description);


    // console.log(defaultValue);

    const handleUpdate = async(e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(`/api/property/updateProperty/${defaultValue._id}`, {
                propertyImg : propertyImg,
                propertyType : type,
                location : location,
                price : price,
                status : status,
                description : description,
            });

            // console.log(response.data);

            if(response.data.success !== true){
                toast.error(response.data.message);
            }

            toast.success(response.data.message);
            setShowUpdate(false);

        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async(id) => {

        try {
            const res = await axiosInstance.delete(`/api/property/deleteProperty/${id}`);

            if(res.data.success !== true) {
                toast.error(res.message);
            };

            toast.success(res.data.message);
            setShowUpdate(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50  bg-opacity-90 flex flex-col items-center justify-center min-h-screen bg-zinc-900">
    <div className=" relative lg:w-3/5 h-700 bg-slate-300 rounded-xl shadow-md p-8">
    <button
              className="absolute top-0 right-0 mt-4 mr-4 rounded-full p-2 bg-gray-800 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
              onClick={() => setShowUpdate(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
      </button>
    <form
// onSubmit={handleUpdate}
className="bg-zinc-50 shadow-md shadow-gray-700 rounded px-8 pt-6 pb-8 mb-4 max-h-full"
>
<p className="text-gray-900 font-bold text-xl md:text-3xl mb-6 mt-4 lg:mt-0 flex justify-center">
  Update Property
</p>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* <!-- Username field --> */}
  <div className="col-span-1">
    <label
      class="block text-zinc-600 text-sm font-bold mb-3"
      for="username"
    >
      Property Type
    </label>
    <input
      className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
      type="text"
      id="propertyType"
      name="propertyType"
      placeholder="Property Type"
      onChange={(e) => setType(e.target.value)}
      defaultValue={defaultValue.propertyType}
    />
  </div>

  {/* <!-- Mobile field --> */}
  <div class="col-span-1">
    <label
      class="block text-zinc-600 text-sm font-bold mb-3"
      for="mobile"
    >
      Location
    </label>
    <input
      className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
      type="text"
      id="location"
      name="location"
      placeholder="Enter property location"
      onChange={(e) => setLocation(e.target.value)}
      defaultValue={defaultValue.location}
    />
  </div>

  {/* <!-- Email field --> */}
  <div class="col-span-1">
    <label
      class="block text-zinc-600 text-sm font-bold mb-3"
      for="email"
    >
      Price
    </label>
    <input
      className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
      type="text"
      id="Enter price"
      name="Enter price"
      onChange={(e) => setPrice(e.target.value)}
      placeholder="Enter price"
      defaultValue={defaultValue.price}
    />
  </div>


  <div className='col-span-1 mt-7 w-full'>
     <div className=' border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 py-1 rounded-lg focus:outline-none focus:shadow-outline'>
        <select className=' border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 rounded-lg focus:outline-none focus:shadow-outline' 
        value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Sold">Sold</option>
            <option value="Not Sold">Not Sold</option>
        </select>
      </div>
  </div>


  <div class="col-span-1">
    <label
      class="block text-zinc-600 text-sm font-bold mb-3"
      for="height"
    >
      Description
    </label>
    <textarea
      className="border-transparent border-2 w-full focus:border-gray-800 bg-zinc-200 text-gray-900 border-gray-400 px-2 py-1 rounded-lg focus:outline-none focus:shadow-outline"
      type="text"
      id="description"
      name="description"
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Enter description"
      defaultValue={defaultValue.description}
    />
  </div>

</div>
{/* <!-- Submit button --> */}
<div className="flex flex-col md:flex-row justify-between items-center gap-5">
  <button
  onClick={handleUpdate}
    className="bg-green-700 mt-8 mb-3 hover:scale-110 duration-200 hover:bg-green-800
     text-white font-bold py-3 px-6 rounded focus:outline-none focus:shadow-outline"
    type="submit"> Update Property
  </button>
  <button  className="bg-red-800 mt-8 mb-3 hover:scale-110 duration-200
    hover:bg-red-700 text-white font-bold py-3 px-6 rounded focus:outline-none 
    focus:shadow-outline" onClick={() => handleDelete(defaultValue._id)}>Delete Property</button>
</div>
</form>
  
    </div>
    </div>
  )
}

export default EditProperty