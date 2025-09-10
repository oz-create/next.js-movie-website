"use client"

import { Rating } from '@mui/material'
import React from 'react'

type MovieInfoProps = {
  title: string
  description: string
  rating: number
}

export default function MovieInfo({title,description,rating} : MovieInfoProps) {
  return (
    <div className='flex flex-col gap-2 relative z-1'>
        <h1 className='text-primary text-5xl font-bold drop-shadow-[0_0_5px_#EBFAFF] dark:drop-shadow-[0_0_5px_#030A1B]'>{title}</h1>
        <p className='font-bold text-primary text-base drop-shadow-[0_0_5px_#EBFAFF] dark:drop-shadow-[0_0_5px_#030A1B]'>{description}</p>
        <div className='flex items-center gap-2'>
          <Rating
                name="customized-10"
                value={rating}
                readOnly
                precision={0.5}
                max={10}
            />
            <span className='text-base text-[#030A1B] dark:text-[#EBFAFF] drop-shadow-[0_0_5px_#EBFAFF] dark:drop-shadow-[0_0_5px_#030A1B]'>{rating.toFixed(1)}</span>
        </div>
        
        <div className="flex items-center gap-3">
            <button className='text-base text-[#030A1B] dark:text-[#EBFAFF] border-2 border-transparent bg-[var(--primary-blue)] py-3 px-5 rounded-full hover:border-[var(--primary-blue)] hover:bg-transparent transition-all'>Watch Movie</button>
            <button className='text-base text-[#030A1B] dark:text-[#EBFAFF] border-2 border-[var(--primary-blue)] py-3 px-5 rounded-full hover:border-transparent hover:bg-[var(--primary-blue)] transition-all'>More Info</button>
        </div>
        
    </div>
  )
}
