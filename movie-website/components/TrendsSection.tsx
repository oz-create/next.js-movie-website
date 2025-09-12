import React from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { BASE_URL } from '@/config/constants';
import SeeMoreButton from './SeeMoreButton';
import Link from 'next/link';


export default function TrendsSection() {
  const { list } = useSelector((state: RootState) => state.movies);

  type Movie = {
    poster_path: string;
    id: number;
  };

  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
        <div className="w-full flex items-center justify-between">
          <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Trends</h1>
          <SeeMoreButton link="/trends" />
        </div>
        <div className='flex items-center justify-start gap-5 overflow-x-scroll overflow-y-hidden max-w-[100%] py-5 px-2'>
            {
                (list as Movie[]).map((movie,index) => (
                  <Link href={`/${movie.id}`} key={index}>
                    <MovieCard imageUrl={BASE_URL + movie.poster_path} />
                  </Link>
                
                ))
            }
        </div>
     
    </section>
  )
}
