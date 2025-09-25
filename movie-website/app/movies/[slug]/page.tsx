"use client"

import MovieSerieDetail from '@/components/MovieSerieDetail';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation'
import React from 'react'
import { useSelector } from 'react-redux';

export default function MovieDetails() {
const { nowPlayingMovies,list,upcomingMovies } = useSelector((state: RootState) => state.movies);
console.log(nowPlayingMovies)
console.log(list)

  const merged = [...nowPlayingMovies, ...list, ...upcomingMovies].filter(
  (item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
  );

console.log(merged);

const paramId = useParams()

const selectedMovie = merged.find((movie) => movie.id === Number(paramId.slug))
console.log(selectedMovie)

  return (
    <div>
        {selectedMovie && <MovieSerieDetail selectedType="movie" selected={selectedMovie}/>}
    </div>
  )
}
