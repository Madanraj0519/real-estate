import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";

const Login = () => {

  const [randomIndex, setRandomIndex] = useState(0);

//   useEffect(() => {

//     const generateRandomNumber = () => {
//       const  index = Math.floor(Math.random() * bgVideos.length);
//       setRandomIndex(index);
//     };

//     generateRandomNumber();

//     const interval = setInterval(generateRandomNumber, 30000);

//     return () => clearInterval(interval);
    
//   }, [])
  


  return (
    <div className='container w-full overflow-hidden flex flex-col text-center'>
      <div  className='md:w-2/6 mx-auto pt-2 mt-10 p-4'>
      <div className=''>
        <div className='content mb-9 w-full relative min-h-full box-border flex justify-center items-center flex-col py-20 px-10 h-full'>
           <div className='CTA max-w-2xl w-full flex flex-col'>
                <img className='logoOne mb-3 text-center max-w-2xl min-h-0 block w-full' alt='' src='' />
                <Link to={'/sign-up'}>
                <button className='signUp font-bold text-[#f9f9f9] mb-3 w-full space-x-2 text-xl py-3 
                border border-transparent cursor-pointer bg-[#0667e7] hover:bg-[#0483ee]'>GET ALL THERE</button>
                </Link>
                <div className='description text-base m-4 space-x-3'>
                    <p>
                    Get Premier Access to Raya and the Last Dragon for an additional fee
                    with a Disney+ subscription. As of 03/26/21, the price of Disney+
                    and The Disney Bundle will increase by $1. 
                    </p>
                </div>
                <img className='logoTwo max-w-[800px] inline-block w-full' alt="" src='' />
          </div>
        </div>
       </div>
         
           
      </div>
    </div>
  )
}

export default Login