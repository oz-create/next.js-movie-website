import React from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CategorySlider from './CategorySlider';
import { BASE_URL } from '@/config/constants';


export default function SeriesSection() {
  const { seriesCategories, series } = useSelector((state: RootState) => state.movies);
  console.log(series)

  type Movie = {
    poster_path: string;
  };

  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
        <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Series</h1>
        <CategorySlider data={seriesCategories} />
        <div className='flex items-center justify-start gap-5 overflow-x-scroll overflow-y-hidden max-w-[100%] py-5 px-2'>
            {
                (series as Movie[]).slice(0,15).map((movie,index) => (
                  <MovieCard key={index} imageUrl={BASE_URL + movie.poster_path} />
                ))
            }
        </div>
     
    </section>
  )
}
