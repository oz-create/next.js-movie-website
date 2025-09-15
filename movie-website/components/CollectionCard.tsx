import React from 'react'
import { FaPlus } from "react-icons/fa";
import { BASE_URL } from '@/config/constants';

type Part = {
  poster_path: string;
};


export default function CollectionCard({ imageUrl, parts }: { imageUrl: string, parts:object[]}) {
  console.log(parts);
  return (
     <div className='min-w-[13rem] h-[18.5rem] rounded-xl relative cursor-pointer hover:scale-105 transition-all'>
        <img src={imageUrl} alt="Movie Poster" className='w-full h-full object-cover rounded-xl absolute z-1'/>
        {
          (parts as Part[]).slice(0, 2).map((part, index) => (
            <img key={index} src={BASE_URL + part.poster_path} alt="Movie Poster" className= "w-full h-full object-cover rounded-xl absolute opacity-50" style={{ marginTop: `${5 + (index*5)}px`, marginLeft: `${5 + (index*5)}px`}}/>
          ))
        }
    </div>
   
  )
}
