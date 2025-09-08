import Image from 'next/image'
import React from 'react'

export default function MovieSlider() {
    const movies = ["openheimer-poster.png", "the-witcher-poster.png", "movie3.png", "movie4.png"];
  return (
    <div className='flex items-center'>
        {
            movies.map((movie,index) => {
                return (
                     <div key={index} className ={`w-30 h-30 rounded-xl overflow-hidden border border-[#006486] mx-[-0.5rem] hover:scale-130`}>
                        <Image
                                src={`/${movie}`}
                                width={120}
                                height={120}
                                alt="logo light"
                                className='w-full h-full object-cover'
                        />
                    </div>
                )
            })
        }
       
       
    </div>
  )
}

//  https://api.themoviedb.org/3/movie/popular?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1