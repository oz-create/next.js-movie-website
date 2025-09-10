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
    <section className='flex flex-col gap-10 mx-10 my-20'>
        <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Trends</h1>
        <div className='flex items-center justify-start gap-5 overflow-x-scroll max-w-[100%]'>
            {
                (list as Movie[]).slice(4,15).map((movie,index) => (
                <MovieCard key={index} imageUrl={baseUrl + movie.poster_path} />
                ))
            }
        </div>
     
    </section>
  )
}
