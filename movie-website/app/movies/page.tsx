"use client"

import AdvanceSearch from '@/components/AdvanceSearch'
import MovieCard from '@/components/MovieCard';
import { BASE_URL } from '@/config/constants';
import { RootState } from '@/store/store';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';

export default function MoviesPage() {
    const { moviesCategories, nowPlayingMovies} = useSelector((state: RootState) => state.movies);
  return (
    <div className='pt-40 px-10'>
        <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Movies</h1>
        <AdvanceSearch />
         <div className='flex items-center justify-center gap-5 flex-wrap'>
            {
                nowPlayingMovies.map((movie,index) => (
                  <Link href={`/${movie.id}`} key={index}>
                    <MovieCard imageUrl={BASE_URL + movie.poster_path} />
                  </Link>
                  
                ))
            }
         </div>
         
    </div>
  )
}
