import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import PromotionSlider from './PromotionSlider'

export default function TopRatedSeries() {
    const { topRatedSeries } = useSelector((state: RootState) => state.movies)
    console.log(topRatedSeries)
  return (
    <section>
        <PromotionSlider data={topRatedSeries} title="TOP RATED SERIES"/>
    </section>
  )
}
