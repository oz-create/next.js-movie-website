import { BASE_URL } from '@/config/constants';
import React from 'react'
import MovieInfo from './MovieInfo';
import MovieCard from './MovieCard';
import { CollectionType, SeriesType } from '@/types/type';
import Link from 'next/link';

export default function CollectionSeasonDetails({ selected, selectedType }:{ selected?: CollectionType | SeriesType, selectedType: "collection" | "season"}) {
   
  return (
    <div className=''>
        <div className='w-full flex items-center justify-center relative'>
            <div className='bg-cover bg-top w-full h-[50rem] flex items-end justify-between gap-10 p-10 transition-all before:content-[""] before:absolute before:w-full before:h-[20rem] before:-bottom-0 before:-left-0 before:-right-0 before:bg-gradient-to-t before:from-[var(--light-color)] before:to-transparent'
            style={{
                backgroundImage: selected?.backdrop_path
                ? `url(${BASE_URL + selected.backdrop_path})`
                : 'none',
            }}>
            <MovieInfo title={selected?.name || ""} description={selected?.overview || ""} rating={selected?.vote_average || 0} url={null}/>

        </div> 
        </div>
       
        <div className='flex items-center justify-center flex-wrap gap-5 p-10 pt-20'>
          {
            selectedType === "collection"
                ? (selected as CollectionType).parts.map((movie, index) => (
                    <Link href={`/movies/${movie.id}`} key={index}>
                    <MovieCard imageUrl={movie.poster_path ? BASE_URL + movie.poster_path : null} />
                    </Link>
                ))
                : (selected as SeriesType).seasons.map((season, index) => (
                    <Link
                    href={`/seasons/${selected?.id}/${season.season_number}`}
                    key={index}
                    >
                    <MovieCard
                        imageUrl={season.poster_path ? BASE_URL + season.poster_path : null}
                    />
                    </Link>
                ))
            }


        
        </div>
    </div>
  )
}
