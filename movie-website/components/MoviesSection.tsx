import React from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CategorySlider from './CategorySlider';


export default function MoviesSection() {
  const { categories, list , nowPlayingMovies} = useSelector((state: RootState) => state.movies);
  console.log(nowPlayingMovies)

  type Movie = {
    poster_path: string;
  };
  const baseUrl = "https://image.tmdb.org/t/p/original";
  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
        <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Movies</h1>
        <CategorySlider data={categories} />
        <div className='flex items-center justify-start gap-5 overflow-x-scroll max-w-[100%]'>
            {
                (nowPlayingMovies as Movie[]).slice(0,15).map((movie,index) => (
                  <MovieCard key={index} imageUrl={baseUrl + movie.poster_path} />
                ))
            }
        </div>
     
    </section>
  )
}
