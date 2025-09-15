import React from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CategorySlider from './CategorySlider';
import { BASE_URL } from '@/config/constants';
import SeeMoreButton from './SeeMoreButton';
import Link from 'next/link';


export default function MoviesSection() {
  const { moviesCategories, nowPlayingMovies} = useSelector((state: RootState) => state.movies);
  console.log(moviesCategories)

  type Movie = {
    poster_path: string;
    id: number
  };

  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
         <div className="w-full flex items-center justify-between">
                <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Movies</h1>
                <SeeMoreButton link="/movies" />
          </div>
        <CategorySlider data={moviesCategories} />
        <div className='flex items-center justify-start gap-5 overflow-x-scroll overflow-y-hidden max-w-[100%] py-5 px-2'>
            {
                (nowPlayingMovies as Movie[]).map((movie,index) => (
                  <Link href={`/${movie.id}`} key={index}>
                    <MovieCard imageUrl={BASE_URL + movie.poster_path} />
                  </Link>
                  
                ))
            }
        </div>
     
    </section>
  )
}
