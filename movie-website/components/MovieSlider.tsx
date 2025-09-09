import React, { useEffect, useState } from 'react'
import MovieInfo from './MovieInfo'
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

type Movie = {
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  vote_average: number;
  // add other properties if needed
};

function MovieSlider() {
  const { list } = useSelector((state: RootState) => state.movies);
  const baseUrl = "https://image.tmdb.org/t/p/w500";

  const movies = (list as Movie[]).slice(0, 4); // ilk 4 film
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Auto slide (5 saniyede bir sonraki filme geç)
  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies.length]);

  const selectedMovie = movies[selectedIndex];

  return (
    <div className='w-full flex items-center justify-center'>
      <div className=' bg-cover bg-center w-full h-[643px] flex items-end justify-between gap-5 px-10 transition-all'
      style={{
          backgroundImage: selectedMovie?.backdrop_path
            ? `url(${baseUrl + selectedMovie.backdrop_path})`
            : 'none',
        }}>
          <MovieInfo title={selectedMovie?.title || ""} description={selectedMovie?.overview || ""} rating={selectedMovie?.vote_average || 0} />
           <div className='flex items-center'>
              {
                (list as Movie[]).slice(0,4).map((movie, index) => (
                  <div className={`w-[7.625rem] h-[7.625rem] cursor-pointer transition overflow-hidden rounded-xl border border-[var(--primary-blue)] mx-[-0.5rem] ${selectedMovie?.poster_path === movie.poster_path ? "scale-125 z-1" : "scale-100 z-0"}`} key={index} onClick={() => setSelectedIndex(index)}>
                    <img key={index} src={baseUrl + movie.poster_path} alt="" className='w-full object-cover' />
                  </div>
                  
                ))
              }
          </div>
    
        </div> 
    </div>
  )
}

export default MovieSlider