import { BASE_URL } from '@/config/constants';
import React from 'react'
import MovieInfo from './MovieInfo';
import MovieCard from './MovieCard';
import { SeasonType } from '@/types/type';
import CircularIndeterminate from './Loader';

export default function SeasonDetail({ selected }:{ selected?: SeasonType | undefined}) {

    if(!selected) return <CircularIndeterminate />;
   
  return (
    <div className=''>
        <div className='w-full flex items-center justify-center relative'>
            <div className='bg-cover bg-bottom w-full h-[800px] flex items-end justify-between gap-10 p-10 transition-all before:content-[""] before:absolute before:w-full before:h-[20rem] before:-bottom-0 before:-left-0 before:-right-0 before:bg-gradient-to-t before:from-[var(--light-color)] before:to-transparent'
            style={{
                backgroundImage: selected?.poster_path
                ? `url(${BASE_URL + selected.poster_path})`
                : 'none',
            }}>
            <MovieInfo title={selected?.name || ""} description={selected?.overview || ""} rating={selected?.vote_average || 0} url={null}/>

        </div> 
        </div>
       
        <div className='flex items-center justify-center flex-wrap gap-5 p-10 pt-20'>
          {
            (selected as SeasonType).episodes?.map((episode, index) => (
                    <div key={index} className='relative flex items-center justify-center overflow-hidden rounded-xl'>
                        <MovieCard
                            imageUrl={episode.still_path ? BASE_URL + episode.still_path : null}
                        />
                        <div className='absolute w-full h-full text-center flex items-center justify-center after:content-[""] after:bg-[var(--light-color)] after:opacity-30 after:w-full after:h-full after:absolute after:left-0 text-lg text-[var(--color-primary)]'><span className='relative z-1 font-bold'>{episode.name}</span></div>
                    </div>
                ))
            }


        
        </div>
    </div>
  )
}
