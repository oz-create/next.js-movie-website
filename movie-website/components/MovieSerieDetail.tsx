import { BASE_URL } from '@/config/constants'
import { ListType, SeriesType } from '@/types/type'
import React from 'react'
import MovieInfo from './MovieInfo'

type MovieSerieDetailProps<T extends "movie" | "serie"> = {
  selectedType: T
  selected: T extends "movie" ? ListType : SeriesType
}

export default function MovieSerieDetail<T extends "movie" | "serie">(
  { selectedType, selected }: MovieSerieDetailProps<T>
) { 
  return (
    <div>
        <div className='w-full flex items-center justify-center relative'>
          <div className='bg-cover bg-top w-full h-[800px] flex items-end justify-between gap-10 p-10 transition-all before:content-[""] before:absolute before:w-full before:h-[20rem] before:-bottom-0 before:-left-0 before:-right-0 before:bg-gradient-to-t before:from-[var(--light-color)] before:to-transparent'
          style={{
              backgroundImage: `url(${BASE_URL + selected.backdrop_path})`
            }}>
            <MovieInfo title={selectedType === "serie" ? selected.name : selected.title} description={selected?.overview || ""} rating={selected?.vote_average || 0} />
            </div> 
    </div>
    <div className='flex'>
        {selectedType === "serie" ?
            (selected as SeriesType)?.seasons.map((season, index) => (
                <div
                key={index}
                className="w-40 h-60 bg-cover bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${BASE_URL + season.poster_path})` }}
            />
            )) : ""
            // :  (selected as CollectionType).parts.map((part, index) => (
            //         <div
            //         key={index}
            //         className="w-40 h-60 bg-cover bg-center rounded-lg shadow-lg"
            //         style={{ backgroundImage: `url(${BASE_URL + part.poster_path})` }}
            //     />
            // ))
    }
    </div>

    </div>
    
  )
}
