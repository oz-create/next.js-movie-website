import React from 'react'
import MovieInfo from './MovieInfo'
import MovieSlider from './MovieSlider'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';


export default function FirstSection() {
  const { list } = useSelector((state: RootState) => state.movies);

  return (
    <section className='w-full flex items-center justify-center'>
      <MovieSlider />
        {/* */}
    </section>
  )
}
