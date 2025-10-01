import React from 'react'
import { BASE_URL } from '@/config/constants';
import { PartType } from '@/types/type';
import Image from 'next/image';


export default function CollectionCard({ imageUrl, parts }: { imageUrl: string, parts: PartType[]}) {

  return (
     <div className='min-w-[13rem] h-[18.5rem] rounded-xl relative cursor-pointer hover:scale-105 transition-all'>
        <Image src={imageUrl} alt="Movie Poster" className='w-full h-full object-cover rounded-xl absolute z-1' width={150} height={150}/>
        {
          parts.slice(0, 2).map((part, index) => (
            <Image key={index} src={BASE_URL + part.poster_path} alt="Movie Poster" className= "w-full h-full object-cover rounded-xl absolute opacity-50" style={{ marginTop: `${5 + (index*5)}px`, marginLeft: `${5 + (index*5)}px`}} width={150} height={150}/>
          ))
        }
    </div>
   
  )
}
