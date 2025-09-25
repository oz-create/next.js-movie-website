"use client"

import { DetailsType, ListType, ReviewType, SeriesType } from "@/types/type";
import MovieInfo from "./MovieInfo";
import { BASE_URL } from "@/config/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import MovieCard from "./MovieCard";


export default function MovieSerieDetail({details,selectedType}:{details: DetailsType, selectedType: string}){

    const [similar, setSimilar] = useState<ListType[] | SeriesType[]>([]);
    

    useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${selectedType === "serie" ? "tv" : "movie"}/${details.id}/similar?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US`,
        );
        setSimilar(res.data.results.slice(0, 5));
        console.log(res.data.results.slice(0, 5))
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, [details.id]);

console.log(details)

const [reviews, setReviews] = useState<ReviewType[]>([]);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/${selectedType === "serie" ? "tv" : "movie"}/${details.id}/reviews?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US&page=1`
        );
        setReviews(res.data.results); // sadece results array
      } catch (error) {
        console.error("Veri çekme hatası:", error);
      }
    };

    fetchData();
  }, [details.id, selectedType]);
  return(
    <div>
      <div className='w-full flex items-center justify-center relative'>
        <div className='bg-cover bg-top w-full h-[800px] flex items-end justify-between gap-10 p-10 transition-all before:content-[""] before:absolute before:w-full before:h-[20rem] before:-bottom-0 before:-left-0 before:-right-0 before:bg-gradient-to-t before:from-[var(--light-color)] before:to-transparent'
           style={{
               backgroundImage: `url(${BASE_URL + details?.backdrop_path})`
            }}>
          <MovieInfo title={`${selectedType === "movie" ? details?.title : details?.name}`} description={details?.overview} rating={details?.vote_average || 0} />
        </div>
      
    </div>
    <div className='flex gap-5 py-5 mx-10'>
            {selectedType === "serie" ?
                details?.seasons.map((season, index) => (
                    <div
                    key={index}
                    className="min-w-40 h-60 bg-cover bg-center rounded-lg shadow-lg"
                    style={{ backgroundImage: `url(${BASE_URL + season.poster_path})` }}
                />
                )) 
                : 
                  details.belongs_to_collection == null ? "" :
                  <div
                        className="min-w-40 h-60 bg-cover bg-center rounded-lg shadow-lg"
                        style={{ backgroundImage: `url(${BASE_URL + details?.belongs_to_collection?.poster_path})` }}
                  />
        }
      </div> 
      <div className='flex items-center gap-5 p-10'>
          {
            details.genres.map((genre,index) => (
              <div key={index} className='py-3 px-5 border border-[var(--primary-blue)] rounded-full text-[var(--color-primary)] text-sm flex-shrink-0 bg-[var(--primary-blue)]'>
                {genre.name}
              </div>
            ))
          
          }

        </div>
        <div className='px-10'>
           {
             similar.length > 0 ?
             <h1 className='text-[var(--color-primary)] text-4xl font-bold'>Suggestion like {selectedType === "serie" ? details.name : details.title}</h1>
             : ""
           }
          
             <div className="flex items-center justify-start gap-5 overflow-x-auto overflow-y-hidden max-w-[100%] py-5 px-2">
               {similar.map((item) => (
                 <Link href={`/${selectedType === "serie" ? "series" : "movies"}/${item.id}`} key={item.id}>
                   <MovieCard imageUrl={BASE_URL + item.poster_path} />
                 </Link>
               ))}
             </div>
         </div>
         <div className='p-10'>
          {
            reviews.length > 0 ? <h1 className='text-[var(--color-primary)] text-4xl font-bold'>Comments</h1> : ""
          }
          
            <div className="flex gap-3 overflow-x-auto overflow-y-hidden py-5">
            {
              reviews.map((review,index) => {
                return (
                  <div key={index} className='flex flex-col gap-2 min-w-[20rem] w-[20rem] h-[20rem] border border-[var(--primary-blue)] rounded-2xl overflow-hidden p-5'>
                    <p className='text-[#808080] text-sm text-right font-bold'>
                      {new Date(review.created_at).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                      })}
                    </p>
                    <div className='flex items-center gap-3'>
                      <div className='bg-[var(--color-primary)] w-[3rem] h-[3rem] rounded-full overflow-hidden'>
                        {
                          review.author_details.avatar_path !== null ?
                          <img src={BASE_URL + review.author_details.avatar_path} alt="" className='object-cover object-center' />
                          : <img src="/user.jpg" alt="" />
                        }
                      </div>
                      <p className='text-[#808080] text-base font-bold'>{review.author_details.username}</p>
                    </div>
                    <p className='overflow-y-auto overflow-x-hidden text-[var(--color-primary)] text-base'>{review.content}</p>
                  </div>
                )
                
              })
            }
        </div>
        </div>
    </div>
  )
}