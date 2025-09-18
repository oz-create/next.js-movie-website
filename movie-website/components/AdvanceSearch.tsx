import React from 'react'
import SelectMenu from './SelectMenu'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store';
import SelectMenuYesNo from './SelectMenuYesNo';

export default function AdvanceSearch() {
    const { list } = useSelector((state: RootState) => state.movies);
    console.log(list)
  return (
    <div className='border border-[var(--primary-blue)] rounded-3xl relative h-[20rem] mt-20 mb-10'>
        <div className='text-2xl text-[var(--color-primary)] absolute top-[-3.5rem] left-5 w-[15rem] h-[3.5rem] bg-[url("/blue-clip.png")] bg-cover bg-no-repeat bg-top flex justify-center items-center'>Advance Search</div>
        <div>
            <img src="/search-logo.png" alt="search image" className='w-[14rem]' />
            <div>
                <SelectMenu label="Date" data={list} valueKey="release_date"/>
                <SelectMenuYesNo label='Adult' />
            </div>
        </div>

    </div>
  )
}
