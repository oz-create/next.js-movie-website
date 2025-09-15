import { RootState } from '@/store/store';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { BASE_URL } from '@/config/constants';
import CollectionCard from './CollectionCard';
import Link from 'next/link';
import SwitchButton from './SwitchButton';


export default function CollectionSection() {
    const { collection, series } = useSelector((state: RootState) => state.movies);
    console.log(collection);

    type Collection = {
        poster_path: string;
        parts: object[];
        id: number;
        seasons: object[];
    };
    const [active,setActive] = useState<boolean>(true)
    const handleSwitch = () => {
        setActive(!active)
    }

  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
        <div className="w-full flex items-center justify-between">
          {
            active ?
            <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Collection</h1>
            :
            <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Seasons</h1>
          }
          
          <SwitchButton option1='Movies' option2='Series' state={active} switchFunction={handleSwitch}/>
        </div>
        <div className='flex items-center justify-start gap-5 overflow-x-scroll overflow-y-hidden max-w-[100%] py-5 px-2'>
            {
              active ?
                (collection as Collection[]).map((movie,index) => (
                  <Link href={`/collection/${movie.id}`} key={index}>
                    <CollectionCard imageUrl={BASE_URL + movie.poster_path} parts={movie.parts}/>
                  </Link>
                
                ))
             :
                (series as Collection[]).map((movie,index) => (
                  <Link href={`/collection/${movie.id}`} key={index}>
                    <CollectionCard imageUrl={BASE_URL + movie.poster_path} parts={movie.seasons}/>
                  </Link>
                
                ))
            }
        </div>
     
    </section>
  )
}
