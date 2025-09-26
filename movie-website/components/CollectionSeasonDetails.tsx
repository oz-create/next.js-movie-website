import { BASE_URL } from '@/config/constants';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
import MovieInfo from './MovieInfo';
import MovieCard from './MovieCard';
import { CollectionType, SeriesType } from '@/types/type';

export default function CollectionSeasonDetails({ selected, selectedType }:{ selected?: CollectionType | SeriesType, selectedType: "collection" | "season"}) {
    console.log(selected)
   
  return (
    <div className=''>
        <div className='w-full flex items-center justify-center relative'>
            <div className='bg-cover bg-top w-full h-[800px] flex items-end justify-between gap-10 p-10 transition-all before:content-[""] before:absolute before:w-full before:h-[20rem] before:-bottom-0 before:-left-0 before:-right-0 before:bg-gradient-to-t before:from-[var(--light-color)] before:to-transparent'
            style={{
                backgroundImage: selected?.backdrop_path
                ? `url(${BASE_URL + selected.backdrop_path})`
                : 'none',
            }}>
            <MovieInfo title={selected?.name || ""} description={selected?.overview || ""} rating={selected?.vote_average || 0} />

        </div> 
        </div>
       
        <div className='flex items-center justify-center flex-wrap gap-5 p-10 pt-20'>
           {
            selectedType === "collection"
                ? (selected as CollectionType).parts.map((movie, index) => (
                    <MovieCard key={index} imageUrl={movie.poster_path ? BASE_URL + movie.poster_path : ""} />
                    ))
                : (selected as SeriesType).seasons.map((movie, index) => (
                <MovieCard key={index} imageUrl={movie.poster_path ? BASE_URL + movie.poster_path : ""} />
                ))
            }

        
        </div>
    </div>
  )
}
