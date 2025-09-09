import React from 'react'
import MovieInfo from './MovieInfo'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Movie = {
  poster_path: string;
  // add other properties if needed
};

function MovieSlider() {
  const { list } = useSelector((state: RootState) => state.movies);
  const baseUrl = "https://image.tmdb.org/t/p/w500";
  return (
    <div className='px-5'>
      <div className='bg-[url("/hero-banner.png")] bg-cover bg-center w-full max-w-[90rem] h-[643px] flex items-end justify-between gap-5'>
          <MovieInfo title="The Witcher" description="Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts." rating={4.5} />
           <div className='flex items-center gap-[-0.5rem]'>
              {
                (list as Movie[]).slice(0,4).map((movie, index) => (
                  <div className='w-[7.625rem] h-[7.625rem] overflow-hidden rounded-xl border border-[var(--primary-blue)]' key={index}>
                    <img key={index} src={baseUrl + movie.poster_path} alt="" className='w-full' />
                  </div>
                  
                ))
              }
      </div>
    
        </div> 
    </div>
  )
}

export default MovieSlider