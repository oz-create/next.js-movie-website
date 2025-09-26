"use client"

import CollectionSeasonDetails from '@/components/CollectionSeasonDetails';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

export default function SeasonsDetailPage() {
    const { series } =  useSelector((state: RootState) => state.movies);

    const param = useParams<{ slug: string }>();
    const seasonId = Number(param.slug); 

    const selectedSeason = series.find((serie) => serie.id == seasonId);
    console.log(selectedSeason)

  return (
    <CollectionSeasonDetails selected={selectedSeason} selectedType='season'/>
  )
}
