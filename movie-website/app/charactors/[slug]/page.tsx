"use client"

import { BASE_URL } from '@/config/constants';
import { PersonType } from '@/types/type';
import axios from 'axios';
import { url } from 'inspector';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function CharactorsPage() {
    const [personDetails, setPersonDetails] = useState<PersonType | undefined | null>(undefined);
    const [personImages, setPersonImages] = useState<PersonType | undefined | null>(undefined);
    const param = useParams<{ slug: string }>();
    const personId = param.slug;

        useEffect(() => {
          const fetchData = async () => {
            try {
              const res = await axios.get(
                `https://api.themoviedb.org/3/person/${personId}?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US`,
              );
              setPersonDetails(res.data);
              console.log(res.data)
            } catch (error) {
              console.error("Veri çekme hatası:", error);
            }
          };
      
          fetchData();
        }, [personId]);

        useEffect(() => {
          const fetchData = async () => {
            try {
              const res = await axios.get(
                `https://api.themoviedb.org/3/person/${personId}/images?api_key=274c12e6e2e4f9ca265a01d107280eba&language=en-US`,
              );
              setPersonImages(res.data);
              console.log(res.data)
            } catch (error) {
              console.error("Veri çekme hatası:", error);
            }
          };
      
          fetchData();
        }, [personId]);
  return (
    <div className='mt-40 p-10'>
        {
            personDetails && 
            <div className='flex flex-col items-center gap-10'>
                <div className={`flex overflow-x-auto w-full ${personImages &&  personImages.profiles.length > 5 ? "justify-start" : "justify-center"}`}>
                    {
                    personImages &&  personImages.profiles.map((image,index) => {
                            return (
                                <div className='min-w-[20rem] w-[20rem] h-[20rem] bg-cover bg-center' style={{backgroundImage:` url(${image.file_path !== null ? BASE_URL + image.file_path : "/user.jpg"})`}}></div>
                            )
                        })
                    }
                </div>

                
                 <div className='flex flex-col gap-3'>
                    <h1 className='text-3xl font-bold text-[var(--color-primary)]'>{personDetails.name}</h1>
                    {
                        personDetails.birthday !== null ? <p className='text-xl text-[var(--color-primary)]'><b>Birthday:</b> {(personDetails.birthday).split("-").reverse().join("-")}</p> : ""
                    }
                    {
                        personDetails.place_of_birth !== null ? <p className='text-xl text-[var(--color-primary)]'><b>Place of birth:</b> {(personDetails.place_of_birth).split("-").reverse().join("-")}</p> : ""
                    }
                    {
                        personDetails.biography !== null ? <p className='text-xl text-[var(--color-primary)]'>{(personDetails.biography).split("-").reverse().join("-")}</p> : ""
                    }
                    
                 </div>
                 
            </div>
           
        }
        
    </div>
  )
}
