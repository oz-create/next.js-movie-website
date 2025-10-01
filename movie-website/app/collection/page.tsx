"use client"

import CollectionCard from '@/components/CollectionCard';
import MovieInfo from '@/components/MovieInfo';
import SwitchButton from '@/components/SwitchButton';
import { BASE_URL } from '@/config/constants';
import { handleCollectionSeason } from '@/store/slices/moviesSlice';
import { AppDispatch, RootState } from '@/store/store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function CollectionPage() {
  const { collection, series, collectionSeasonState } = useSelector((state: RootState) => state.movies);
  console.log(collection)
  console.log(series)

    const movies = collectionSeasonState ? collection.slice(0, 4) : series.slice(0,4); // ilk 4 film
    const [selectedIndex, setSelectedIndex] = useState(0);
     const dispatch = useDispatch<AppDispatch>()
  
    // Auto slide (5 saniyede bir sonraki filme geç)
    useEffect(() => {
      if (movies.length === 0) return;
  
      const interval = setInterval(() => {
        setSelectedIndex((prev) => (prev + 1) % movies.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, [movies.length]);
  
    const selectedMovie = movies[selectedIndex];

  return (
    <div className=''>
       <div className='w-full flex items-center justify-center relative'>
             <div className='bg-cover bg-top w-full h-[50rem] flex lg:flex-row flex-col lg:items-end items-center lg:justify-between justify-end gap-10 p-10 transition-all before:content-[""] before:absolute before:w-full lg:before:h-[20rem] before:h-[40rem] before:-bottom-0 before:-left-0 before:-right-0 before:bg-gradient-to-t before:from-[var(--light-color)] before:to-transparent'
             style={{
                 backgroundImage: selectedMovie?.backdrop_path
                   ? `url(${BASE_URL + selectedMovie.backdrop_path})`
                   : 'none',
               }}>
                 <MovieInfo title={selectedMovie?.name || ""} description={selectedMovie?.overview || ""} rating={selectedMovie?.vote_average || 0} />
                  <div className='flex items-center relative z-1'>
                     {
                      collectionSeasonState ?
                       collection.slice(0,4).map((movie, index) => (
                         <div className={`w-[7.625rem] h-[7.625rem] cursor-pointer transition overflow-hidden rounded-xl border border-[var(--primary-blue)] mx-[-0.5rem] ${selectedMovie?.poster_path === movie.poster_path ? "scale-125 z-1" : "scale-100 z-0"}`} key={index} onClick={() => setSelectedIndex(index)}>
                          <Image key={index} src={BASE_URL + movie.poster_path} alt={movie.name} className='w-full object-cover' width={7} height={7}/>
                         </div>
                         
                       ))
                       :
                       series.slice(0,4).map((movie, index) => (
                         <div className={`w-[7.625rem] h-[7.625rem] cursor-pointer transition overflow-hidden rounded-xl border border-[var(--primary-blue)] mx-[-0.5rem] ${selectedMovie?.poster_path === movie.poster_path ? "scale-125 z-1" : "scale-100 z-0"}`} key={index} onClick={() => setSelectedIndex(index)}>
                           <Image key={index} src={BASE_URL + movie.poster_path} alt={movie.name} className='w-full object-cover' width={7} height={7}/>
                         </div>
                         
                       ))
                     }
                 </div>
           
               </div> 
           </div>
           <div className='flex items-center justify-end px-10 pt-10'>
              <SwitchButton option1='Movies' option2='Series' state={collectionSeasonState} switchFunction={() => dispatch(handleCollectionSeason())}/>
           </div>
           
      <div className='flex items-center justify-center gap-10 flex-wrap p-10'>
            {
              collectionSeasonState ?
              collection.map((movie,index) => (
                <Link href={`/collection/${movie.id}`} key={index}>
                  <CollectionCard imageUrl={BASE_URL + movie.poster_path} parts={movie.parts}/>
                </Link>
              
              ))
             :
                 series.map((serie,index) => (
                  <Link href={`/seasons/${serie.id}`} key={index}>
                    <CollectionCard imageUrl={BASE_URL + serie.poster_path} parts={serie.seasons}/>
                  </Link>
                
                ))
            }
        </div>
    </div>
  )
}
