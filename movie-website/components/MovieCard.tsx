import React from 'react'

export default function MovieCard({imageUrl}: {imageUrl: string}) {
  return (
    <div className='min-w-[13rem] h-[18.5rem] rounded-xl overflow-hidden' style={{clipPath: 'polygon(32.00% 26.00%,31% 0%,100% 0%,100% 100%,0% 100%,0% 26%)'}}>
        <img src={imageUrl} alt="Movie Poster" className='w-full h-full object-cover'/>
    </div>
  )
}
