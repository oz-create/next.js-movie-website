"use client"

import MovieSerieDetail from '@/components/MovieSerieDetail';
import { RootState } from '@/store/store';
import { DetailsType, ListType, SeriesType } from '@/types/type';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';

export default function MovieDetails() {
  const [movieDetails, setMovieDetails] = useState<DetailsType | null>(null);

  const param = useParams<{ slug: string }>();
  const movieId = Number(param.slug); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US`,
        );
        setMovieDetails(res.data);
        console.log(res.data)
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, [movieId]);



  return (
    <div>
      {
         movieDetails &&
        <MovieSerieDetail
          selectedType="movie"
          details={movieDetails}
        />
      }
     
    </div>
  )
}
