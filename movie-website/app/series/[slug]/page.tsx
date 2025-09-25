"use client"

import MovieSerieDetail from '@/components/MovieSerieDetail';
import { RootState } from '@/store/store';
import { DetailsType, ListType, SeriesType } from '@/types/type';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';

export default function SerieDetails() {
  const [serieDetails, setSerieDetails] = useState<DetailsType | null>(null);

  const param = useParams<{ slug: string }>();
  const serieId = Number(param.slug); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/tv/${serieId}?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US`,
        );
        setSerieDetails(res.data);
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, [serieId]);



  return (
    <div>
      {
         serieDetails &&
        <MovieSerieDetail
          selectedType="serie"
          details={serieDetails}
        />
      }
     
    </div>
  )
}
