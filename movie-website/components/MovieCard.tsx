import Image from 'next/image';
import React from 'react'
import { FaPlus } from "react-icons/fa";

export default function MovieCard({imageUrl}: {imageUrl: string | null}) {
  return (
    <div className='sm:min-w-[13rem] sm:w-[13rem] min-w-[11rem] w-[11rem] sm:h-[18.5rem] h-[16rem] rounded-xl overflow-hidden relative cursor-pointer hover:scale-105 transition-all'>
        <div className='w-14 h-14 rounded-br-2xl rounded-tl-none rounded-tr-none rounded-bl-none flex items-center justify-center absolute top-0 left-0 backdrop-blur-sm border-r-10 border-b-10 border-[var(--light-color)]'>
            <FaPlus className='text-white text-3xl'/>
        </div>
        {
          imageUrl !== null ? <Image src={imageUrl} alt="Movie Poster" className='w-full h-full object-cover' width={150} height={150}/>
          : <Image src="" alt="Movie Poster" className='w-full h-full object-cover' width={150} height={150}/>
        }
       
    </div>
  )
}
