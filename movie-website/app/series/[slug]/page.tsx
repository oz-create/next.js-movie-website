"use client"

import MovieSerieDetail from '@/components/MovieSerieDetail';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux'

export default function SerieDetails() {
const { series } = useSelector((state: RootState) => state.movies);
const paramId = useParams()

const selectedSerie = series.find((serie) => serie.id === Number(paramId.slug))
console.log(selectedSerie)

  return (
    <div>
        {selectedSerie && <MovieSerieDetail selectedType="serie" selected={selectedSerie}/>}
    </div>
  )
}
