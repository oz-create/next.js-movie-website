"use client"

import CollectionSeasonDetails from '@/components/CollectionSeasonDetails';
import { RootState } from '@/store/store';
import { useParams } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';

export default function CollectionDetailPage() {
    const { collection } =  useSelector((state: RootState) => state.movies);

    const param = useParams<{ slug: string }>();
    const collectionId = Number(param.slug); 

    const selectedCollection = collection.find((collection) => collection.id == collectionId);

  return (
    <CollectionSeasonDetails selected={selectedCollection} selectedType='collection'/>
  )
}
