import { RootState } from '@/store/store';
import React from 'react'
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { BASE_URL } from '@/config/constants';
import CollectionCard from './CollectionCard';
import Link from 'next/link';


export default function CollectionSection() {
    const { collection } = useSelector((state: RootState) => state.movies);
    console.log(collection);

    type Movie = {
        poster_path: string;
        parts: any;
        id: number
    };

  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
        <div className="w-full flex items-center justify-between">
          <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Collection</h1>
         
        </div>
        <div className='flex items-center justify-start gap-5 overflow-x-scroll overflow-y-hidden max-w-[100%] py-5 px-2'>
            {
                (collection as Movie[]).map((movie,index) => (
                  <Link href={`/collection/${movie.id}`} key={index}>
                    <CollectionCard imageUrl={BASE_URL + movie.poster_path} parts={movie.parts}/>
                  </Link>
                
                ))
            }
        </div>
     
    </section>
  )
}
