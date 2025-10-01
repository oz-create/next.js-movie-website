import { AppDispatch, RootState } from '@/store/store';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '@/config/constants';
import CollectionCard from './CollectionCard';
import Link from 'next/link';
import SwitchButton from './SwitchButton';
import { handleCollectionSeason } from '@/store/slices/moviesSlice';
import SeeMoreButton from './SeeMoreButton';

export default function CollectionSection() {
    const { collection, series, collectionSeasonState } = useSelector((state: RootState) => state.movies);
    const dispatch = useDispatch<AppDispatch>()

  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
        <div className="w-full flex items-center justify-between flex-col lg:flex-row lg:gap-0 gap-10">
          {
            collectionSeasonState ?
            <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Collection</h1>
            :
            <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Seasons</h1>
          }
          <div className='flex items-center gap-5 lg:justify-center justify-between lg:w-auto w-full'>
            <SwitchButton option1='Movies' option2='Series' state={collectionSeasonState} switchFunction={() => dispatch(handleCollectionSeason())}/>
            <SeeMoreButton link={"/collection"}/>
          </div>
        
        </div>
        <div className='flex items-center justify-start gap-5 overflow-x-auto overflow-y-hidden max-w-[100%] py-5 px-2'>
            {
              collectionSeasonState ?
                collection.map((movie,index) => (
                  <Link href={`/collection/${movie.id}`} key={index}>
                    <CollectionCard imageUrl={BASE_URL + movie.poster_path} parts={movie.parts}/>
                  </Link>
                
                ))
             :
                series.map((movie,index) => (
                  <Link href={`/seasons/${movie.id}`} key={index}>
                    <CollectionCard imageUrl={BASE_URL + movie.poster_path} parts={movie.seasons}/>
                  </Link>
                
                ))
            }
        </div>
     
    </section>
  )
}
