import { RootState } from '@/store/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '@/config/constants'
import Link from 'next/link'

export default function CharactorsSection() {

   const { people } = useSelector((state: RootState) => state.movies)

  return (
    <section className='flex flex-col gap-10 mx-10 my-20'>
         <h1 className='text-5xl text-[var(--color-primary)] font-bold'>Charactors</h1>
         <div className='flex items-center justify-start gap-5 overflow-x-scroll overflow-y-hidden max-w-[100%] py-5 px-2'>
            {
                people.map((person) => (
                    <Link href={`/charactors/${person.id}`} key={person.id}>
                        <div className='min-w-[5.5rem] h-[5.5rem] rounded-full overflow-hidden cursor-pointer hover:scale-105 transition-all'>
                            <img src={BASE_URL + person.profile_path} alt={person.name} className='object-cover'/>
                        </div>  
                    </Link>
                                   
                ))
            }
         </div>
     
    </section>
  )
}
