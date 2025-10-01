import { RootState } from '@/store/store';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '@/config/constants';
import { ListTypeArray } from '@/types/type';
import Link from 'next/link';

export default function PromotionSlider({ data, title, dataType }: { data: ListTypeArray , title: string, dataType: string}) {

    const [selectedIndex, setSelectedIndex] = useState(0);

     useEffect(() => {
      if (!data || data.length === 0) return;
  
      const interval = setInterval(() => {
        setSelectedIndex((prev) => (prev + 1) % data.length);
      }, 3000);
  
      return () => clearInterval(interval);
    }, [data]);
  

  
    if (!data || data.length === 0) {
      return <p>Loading...</p>;
    }

  return (
    <section>
      <div className="relative lg:h-[30rem] h-[40rem] flex lg:flex-row flex-col items-center overflow-hidden lg:p-0 p-10">
        {/* Background images */}
        {data.map((movie, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === selectedIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${BASE_URL + movie.backdrop_path})`,
            }}
          />
        ))}

        {/* Overlay gradient */}
        <div className="absolute inset-0 lg:bg-gradient-to-r bg-gradient-to-b from-[var(--light-color)] to-transparent" />

        {/* Title */}
        <h1 className="absolute lg:left-20 left-auto z-10 text-6xl font-bold text-[var(--color-primary)] max-w-[22rem] lg:text-left text-center">
          {title}
        </h1>

        {/* Posters */}
        {data.map((movie, index) => (
          <Link href={`${dataType}/${movie.id}`} key={index} className='w-[14rem] absolute lg:right-20 right-auto lg:bottom-auto bottom-10'>
            <img
            src={BASE_URL + movie.poster_path}
            alt="Upcoming movie"
            className={`rounded-xl shadow-lg border-4 border-[var(--light-color)] transition-opacity duration-1000 ${
              index === selectedIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
          </Link>
          
        ))}
      </div>
    </section>
  );
}
