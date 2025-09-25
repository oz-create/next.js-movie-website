"use client"

import AdvanceSearch from '@/components/AdvanceSearch'
import MovieCard from '@/components/MovieCard';
import { BASE_URL } from '@/config/constants';
import { RootState } from '@/store/store';
import { ListTypeArray } from '@/types/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function MoviesPage() {
  const { nowPlayingMovies,list, moviesCategories,upcomingMovies } = useSelector((state: RootState) => state.movies);
  const [filteredMovies,setFilteredMovies] = useState<ListTypeArray>(nowPlayingMovies)

  const merged = [...nowPlayingMovies, ...list, ...upcomingMovies].filter(
  (item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
  );

    useEffect(() => {
      setFilteredMovies(merged)
    }, [nowPlayingMovies,list])
    
  return (
    <div className='pt-40 px-10'>
        <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Movies</h1>
        <AdvanceSearch filterData={nowPlayingMovies} setFilterData={setFilteredMovies} searchName='movies' categories={moviesCategories}/>
         <div className='flex items-center justify-center gap-5 flex-wrap'>
            {
                filteredMovies.map((movie,index) => (
                  <Link href={`/movies/${movie.id}`} key={index}>
                    <MovieCard imageUrl={BASE_URL + movie.poster_path} />
                  </Link>
                  
                ))
            }
         </div>
         
    </div>
  )
}
