import { RootState } from '@/store/store';
import Link from 'next/link';
import React from 'react'
import { useSelector } from 'react-redux';
import { MdShoppingBag } from "react-icons/md";

export default function PaymentSection() {
    const { mode } = useSelector((state: RootState) => state.theme);
  return (
    <div className='flex items-center justify-center gap-10'>
        <div className='flex flex-col justify-center items-center gap-20 bg-contain bg-no-repeat bg-center w-[20rem] h-[33rem]'
        style={{backgroundImage: `url(${mode === 'light' ? '/dark-mini-subtract.png' : '/light-mini-subtract.png'})`}}>
            <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='text-[var(--primary-blue)] text-4xl font-bold'>Basic</h1>
                <p className='text-[var(--primary-blue)] text-2xl'>3 months</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <h1 className='text-[var(--primary-blue)] text-4xl font-bold'>$15.140</h1>
                <p className='text-[var(--primary-blue)] text-base'>Cancel anytime</p>
                <Link href={'/payment'}  className='flex justify-center items-center gap-3 bg-linear-to-r from-[#0CC2FF] to-[#275EE7] text-[#EBFAFF] p-3 rounded-xl my-5 hover:text-[#030A1B] transition'>
                        <MdShoppingBag className='text-inherit'/>
                        <span className='text-inherit text-base'>C O N T I U N E</span>
                </Link>
            </div>
            
        </div>
          <div className='flex flex-col justify-center items-center gap-20 bg-contain bg-no-repeat bg-center w-[25rem] h-[56rem]'
        style={{backgroundImage: 'url("/subtract.png")'}}>
            <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='text-[#EBFAFF] text-4xl font-bold'>Suggested</h1>
                <p className='text-[#EBFAFF] text-2xl'>3 months</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <h1 className='text-[#EBFAFF] text-4xl font-bold line-through decoration-red-500'>$24.990</h1>
                <h1 className='text-[#EBFAFF] text-4xl font-bold'>$22.990</h1>
                <p className='text-[#EBFAFF] text-base'>Cancel anytime</p>
                <Link href={'/payment'}  className='flex justify-center items-center gap-3 bg-[#EBFAFF] text-[var(--primary-blue)] p-3 rounded-xl mt-5 hover:text-[#030A1B] transition'>
                        <MdShoppingBag className='text-inherit'/>
                        <span className='text-inherit text-base'>C O N T I U N E</span>
                </Link>
            </div>
            
        </div>
          <div className='flex flex-col justify-center items-center gap-20 bg-contain bg-no-repeat bg-center w-[20rem] h-[33rem]'
        style={{backgroundImage: `url(${mode === 'light' ? '/dark-mini-subtract.png' : '/light-mini-subtract.png'})`}}>
            <div className='flex flex-col justify-center items-center gap-3'>
                <h1 className='text-[var(--primary-blue)] text-4xl font-bold'>Premium</h1>
                <p className='text-[var(--primary-blue)] text-2xl'>12 months</p>
            </div>
            <div className='flex flex-col justify-center items-center gap-2'>
                <h1 className='text-[var(--primary-blue)] text-4xl font-bold'>$35.199</h1>
                <p className='text-[var(--primary-blue)] text-base'>Cancel anytime</p>
                <Link href={'/payment'}  className='flex justify-center items-center gap-3 bg-linear-to-r from-[#0CC2FF] to-[#275EE7] text-[#EBFAFF] p-3 rounded-xl my-5 hover:text-[#030A1B] transition'>
                        <MdShoppingBag className='text-inherit'/>
                        <span className='text-inherit text-base'>C O N T I U N E</span>
                </Link>
            </div>
            
        </div>
      
    </div>
  )
}
