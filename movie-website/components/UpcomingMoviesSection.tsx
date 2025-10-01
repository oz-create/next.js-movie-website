import React from 'react'
import PromotionSlider from './PromotionSlider'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export default function UpcomingMoviesSection() {
  const { upcomingMovies } = useSelector((state: RootState) => state.movies);
    
  return (
    <div>
      <PromotionSlider data={upcomingMovies} dataType="movies" title="UPCOMING MOVIES"/>
    </div>
  )
}
