"use client"

import MovieSerieDetail from '@/components/MovieSerieDetail';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux'

export default function SerieDetails() {
const { series,topRatedSeries } = useSelector((state: RootState) => state.movies);
const paramId = useParams()

const merged = [...series, ...topRatedSeries].filter(
(item, index, self) =>
  index === self.findIndex((t) => t.id === item.id)
);
console.log(series)
console.log(topRatedSeries)
console.log(merged)

const selectedSerie = merged.find((serie) => serie.id === Number(paramId.slug))
console.log(selectedSerie)

  return (
    <div>
        {selectedSerie && <MovieSerieDetail selectedType="serie" selected={selectedSerie}/>}
    </div>
  )
}
