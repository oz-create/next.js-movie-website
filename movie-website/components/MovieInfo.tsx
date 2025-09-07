

import { Rating } from '@mui/material'
import React from 'react'

type MovieInfoProps = {
  title: string
  description: string
  rating: number
}

export default function MovieInfo({title,description,rating} : MovieInfoProps) {
  return (
    <div>
        <h1 className='text-white text-5xl font-bold'>{title}</h1>
        <p className='text-white text-base'>{description}</p>
        <Rating
            name="text-feedback"
            value={rating}
            readOnly
            precision={0.5}
        />
        <div className="flex items-center gap-3">
            <button className='text-base text-white border-2 border-transparent bg-[var(--primary-blue)] py-3 px-5 rounded-full hover:border-[var(--primary-blue)] hover:bg-transparent transition-all'>Watch Movie</button>
            <button className='text-base text-white border-2 border-[var(--primary-blue)] py-3 px-5 rounded-full hover:border-transparent hover:bg-[var(--primary-blue)] transition-all'>More Info</button>
        </div>
        
    </div>
  )
}
