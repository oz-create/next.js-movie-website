import React from 'react'
import { FaPlus } from "react-icons/fa";

export default function CollectionCard({imageUrl}: {imageUrl: string}) {
  return (
    <div className='min-w-[13rem] h-[18.5rem] rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-all'>
        <img src={imageUrl} alt="Movie Poster" className='w-full h-full object-cover'/>
    </div>
  )
}
