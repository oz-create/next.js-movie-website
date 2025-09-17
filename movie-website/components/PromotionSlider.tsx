import { RootState } from '@/store/store';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BASE_URL } from '@/config/constants';
import { ListTypeArray } from '@/types/type';

export default function PromotionSlider({ data, title }: { data: ListTypeArray , title: string}) {

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
      <div className="relative h-[30rem] flex items-center overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--light-color)] to-transparent" />

        {/* Title */}
        <h1 className="absolute left-20 z-10 text-6xl font-bold text-[var(--color-primary)] max-w-[22rem]">
          {title}
        </h1>

        {/* Posters */}
        {data.map((movie, index) => (
          <img
            key={index}
            src={BASE_URL + movie.poster_path}
            alt="Upcoming movie"
            className={`w-[14rem] absolute right-20 rounded-xl shadow-lg border-4 border-[var(--light-color)] transition-opacity duration-1000 ${
              index === selectedIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
