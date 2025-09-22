"use client"

import AdvanceSearch from '@/components/AdvanceSearch'
import MovieCard from '@/components/MovieCard';
import { BASE_URL } from '@/config/constants';
import { RootState } from '@/store/store';
import { ListTypeArray } from '@/types/type';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function SeriesPage() {
    const { series } = useSelector((state: RootState) => state.movies);
    console.log(series)
    const [filteredSeries,setFilteredSeries] = useState<ListTypeArray>(series)

    useEffect(() => {
      setFilteredSeries(series)
    }, [series])
    
  return (
    <div className='pt-40 px-10'>
        <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Series</h1>
        <AdvanceSearch filterData={series} setFilterData={setFilteredSeries} searchName={"series"}/>
         <div className='flex items-center justify-center gap-5 flex-wrap'>
            {
                filteredSeries.map((movie,index) => (
                  <Link href={`/${movie.id}`} key={index}>
                    <MovieCard imageUrl={BASE_URL + movie.poster_path} />
                  </Link>
                  
                ))
            }
         </div>
         
    </div>
  )
}
