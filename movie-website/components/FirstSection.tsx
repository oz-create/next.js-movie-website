import React from 'react'
import MovieInfo from './MovieInfo'
import MovieSlider from './MovieSlider'

export default function FirstSection() {
  return (
    <section className='w-full flex items-center justify-center'>
        <div className='bg-[url("/hero-banner.png")] bg-cover bg-center w-full max-w-[90rem] h-[643px] flex items-end justify-between'>
          <MovieInfo title="The Witcher" description="Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts." rating={4.5} />
          <MovieSlider />
        </div>
    </section>
  )
}
