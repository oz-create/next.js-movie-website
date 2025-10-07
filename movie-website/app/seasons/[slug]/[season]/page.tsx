"use client"

import SeasonDetail from '@/components/SeasonDetail';
import { SeasonType } from '@/types/type';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function SeasonDetailPage() {
  const [seasonDetails, setSeasonDetails] = useState<SeasonType | undefined>(undefined);
  const param = useParams<{ slug: string, season: string }>();
  const serieId = Number(param.slug); 
  const seasonNumber = Number(param.season)
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/tv/${serieId}/season/${seasonNumber}?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US`,
          );
          setSeasonDetails(res.data);
        } catch (error) {
          console.error("Veri çekme hatası:", error);
        }
      };
  
      fetchData();
    }, [serieId,seasonNumber]);

  return (
    <div>
      <SeasonDetail selected={seasonDetails}/>
    </div>
  )
}
