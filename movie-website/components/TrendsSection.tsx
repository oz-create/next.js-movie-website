import React from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function TrendsSection() {
      const { list } = useSelector((state: RootState) => state.movies);

  type Movie = {
    poster_path: string;
  };
  const baseUrl = "https://image.tmdb.org/t/p/original";
  return (
    <div className='flex flex-col gap-5 m-10'>
        <h1>Trends</h1>
        <div className='flex items-center justify-start gap-5 overflow-x-scroll max-w-[100%]'>
            {
                (list as Movie[]).slice(4,15).map((movie,index) => (
                <MovieCard key={index} imageUrl={baseUrl + movie.poster_path} />
                ))
            }
        </div>
     
    </div>
  )
}
