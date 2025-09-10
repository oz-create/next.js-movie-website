import React from 'react'
import { FaPlus } from "react-icons/fa";

export default function MovieCard({imageUrl}: {imageUrl: string}) {
  return (
    <div className='min-w-[13rem] h-[18.5rem] rounded-xl overflow-hidden relative'>
        <div className='w-14 h-14 rounded-br-2xl rounded-tl-none rounded-tr-none rounded-bl-none flex items-center justify-center absolute top-0 left-0 backdrop-blur-sm border-r-10 border-b-10 border-[var(--light-color)]'>
            <FaPlus className='text-white text-3xl'/>
        </div>
        <img src={imageUrl} alt="Movie Poster" className='w-full h-full object-cover'/>
    </div>
  )
}
