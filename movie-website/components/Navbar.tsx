import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";

export default function Navbar() {
  return (
    <div className="flex justify-center w-full fixed top-9">
      <div className='relative h-20 max-w-7xl w-full flex items-center justify-between inset-0 rounded-2xl gradient-border backdrop-blur-sm pr-5'>
        <Image
        src="/Logo-light.png"
        width={92}
        height={92}
        alt="logo light"
        className='w-23 h-23'
      />
      <div className='flex items-center justify-center gap-8'>
        <Link href="/" className='text-white text-2xl'>Home</Link>
        <Link href="/pricing" className='text-white text-2xl'>Pricing</Link>
        <Link href="/movies" className='text-white text-2xl'>Movies</Link>
        <Link href="/series" className='text-white text-2xl'>Series</Link>
        <Link href="/collection" className='text-white text-2xl'>Collection</Link>
        <Link href="/faq" className='text-white text-2xl'>FAQ</Link>
      </div>
      <div className='flex items-center justify-center gap-8'>
        <CiSearch className='text-white w-8 h-8 object-cover'/>
        <IoIosNotifications className='text-white w-8 h-8 object-cover' />
        <FaUser className='text-white w-6 h-6 object-cover' />
        <IoSunny className='text-white w-7 h-7 object-cover' />
      </div>
      </div>
      
    </div>
  )
}
