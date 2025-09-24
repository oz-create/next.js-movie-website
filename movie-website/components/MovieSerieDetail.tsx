import { BASE_URL } from '@/config/constants'
import { CollectionType, ListType, SeriesType, SimilarType } from '@/types/type'
import React, { useEffect, useState } from 'react'
import MovieInfo from './MovieInfo'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import axios from 'axios'

type MovieSerieDetailProps<T extends "movie" | "serie"> = {
  selectedType: T
  selected: T extends "movie" ? ListType : SeriesType
}



export default function MovieSerieDetail<T extends "movie" | "serie">(
  { selectedType, selected }: MovieSerieDetailProps<T>
) { 
  const { moviesCategories } = useSelector((state: RootState) => state.movies);
  console.log(selected)
  const genreNames = moviesCategories.filter((cat) => selected.genre_ids.includes(cat.id)).map((cat) => cat.name);

const [similar, setSimilar] = useState<SimilarType[]>([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${selectedType === "serie" ? "tv" : "movie"}/${selected.id}/similar?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1`
        );
        setSimilar(res.data.results.slice(0,5)); // sadece results array
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, [selected.id, selectedType]);

  useEffect(() => {
  console.log("Benzer içerikler:", similar);
}, [similar]);

  
  return (
    <div>
        <div className='w-full flex items-center justify-center relative'>
          <div className='bg-cover bg-top w-full h-[800px] flex items-end justify-between gap-10 p-10 transition-all before:content-[""] before:absolute before:w-full before:h-[20rem] before:-bottom-0 before:-left-0 before:-right-0 before:bg-gradient-to-t before:from-[var(--light-color)] before:to-transparent'
          style={{
              backgroundImage: `url(${BASE_URL + selected.backdrop_path})`
            }}>
            <MovieInfo title={selectedType === "serie" ? selected.name : selected.title} description={selected?.overview || ""} rating={selected?.vote_average || 0} />
            </div> 
        </div>
        <div className='flex gap-5 px-10'>
            {selectedType === "serie" ?
                (selected as SeriesType)?.seasons.map((season, index) => (
                    <div
                    key={index}
                    className="w-40 h-60 bg-cover bg-center rounded-lg shadow-lg"
                    style={{ backgroundImage: `url(${BASE_URL + season.poster_path})` }}
                />
                )) 
                :  (selected as ListType).collection?.parts?.map((part, index) => (
                        <div
                        key={index}
                        className="w-40 h-60 bg-cover bg-center rounded-lg shadow-lg"
                        style={{ backgroundImage: `url(${BASE_URL + part.poster_path})` }}
                    />
                ))
        }
        </div>
        <div className='flex items-center gap-5 p-10'>
          {
            genreNames.map((genre,index) => {
              return <div key={index} className='py-3 px-5 border border-[var(--primary-blue)] rounded-full text-[var(--color-primary)] text-sm flex-shrink-0 bg-[var(--primary-blue)]'>
                {genre}
              </div>
            })
          }

        </div>
        <div className="flex gap-5 overflow-x-auto px-10">
          {similar.map((item) => (
            <div
              key={item.id}
              className="w-40 h-60 bg-cover bg-center rounded-lg shadow-lg flex-shrink-0"
              style={{ backgroundImage: `url(${BASE_URL + item.poster_path})` }}
              title={item.title || item.name}
            />
          ))}
        </div>

    </div>
    
  )
}
