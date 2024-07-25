import React from 'react'

function HeaderItem({name,Icon}) {
  return (
    <div className='text-[#cacaca] flex items-center gap-3
    text-[15px] font-semibold cursor-pointer hover:underline
    underline-offset-8 mb-2'>
        <Icon className='text-xl'/>
        <h2 className='md:text-lg'>{name}</h2>
    </div>
  )
}

export default HeaderItem