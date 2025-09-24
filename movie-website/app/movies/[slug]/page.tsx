"use client"

import MovieSerieDetail from '@/components/MovieSerieDetail';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux';

export default function MovieDetails() {
const { nowPlayingMovies,list } = useSelector((state: RootState) => state.movies);
console.log(nowPlayingMovies)

const paramId = useParams()

const selectedMovie = nowPlayingMovies.find((movie) => movie.id === Number(paramId.slug))
console.log(selectedMovie)

  return (
    <div>
        {selectedMovie && <MovieSerieDetail selectedType="movie" selected={selectedMovie}/>}
    </div>
  )
}
