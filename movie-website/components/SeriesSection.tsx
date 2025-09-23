import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import CategorySlider from './CategorySlider';
import { BASE_URL } from '@/config/constants';
import SeeMoreButton from './SeeMoreButton';
import Link from 'next/link';
import { ListTypeArray } from '@/types/type';


export default function SeriesSection() {
  const { seriesCategories, series } = useSelector((state: RootState) => state.movies);

    const [filteredData,setFilterData] = useState<ListTypeArray>(series)
     const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  
      useEffect(() => {
        setFilterData(series)
      }, [series])
  
      function checkCategory(genreIds: number[]) {
        if (selectedCategory === null) return true;
        return genreIds.includes(selectedCategory);
      }
  
      const filter = () => {
        const filtered = series.filter((element) => {
          const categoryCheck = checkCategory(element.genre_ids)
          return categoryCheck;
        });
  
        setFilterData(filtered);
      };
  
  
      useEffect(() => {
        filter()
      }, [selectedCategory])


  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
      <div className="w-full flex items-center justify-between">
        <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Series</h1>
        <SeeMoreButton link="/series" />
      </div>
        
        <CategorySlider data={seriesCategories} setSelected={setSelectedCategory}/>
        <div className='flex items-center justify-start gap-5 overflow-x-auto overflow-y-hidden max-w-[100%] py-5 px-2'>
            {
                filteredData.map((movie,index) => (
                  <Link href={`/${movie.id}`} key={index}>
                    <MovieCard imageUrl={BASE_URL + movie.poster_path} />
                  </Link>
                  
                ))
            }
        </div>
     
    </section>
  )
}
