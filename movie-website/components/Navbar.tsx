"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleTheme } from '@/store/slices/themeSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.theme);

  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/pricing", label: "Pricing" },
    { href: "/movies", label: "Movies" },
    { href: "/series", label: "Series" },
    { href: "/collection", label: "Collection" },
    { href: "/faq", label: "FAQ" },
  ];
  return (
    <div className="flex justify-center w-full fixed top-9 z-10">
      <div className='relative h-20 max-w-7xl w-full flex items-center justify-between inset-0 rounded-2xl gradient-border backdrop-blur-sm pr-5'>
        <Image
        src="/Logo-light.png"
        width={92}
        height={92}
        alt="logo light"
        className='w-23 h-23'
      />
      <div className='flex items-center justify-center gap-8 z-10'>
        {
          links.map((link,index) => (
            <Link key={index} href={link.href} className={`text-white text-2xl relative transition-all ${link.href === pathname ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[4px] after:bg-[var(--primary-blue)] after:blur-[2px]" : ""}`}>{link.label}</Link>
          ))
        }
        
      </div>
      <div className='flex items-center justify-center gap-8 z-10'>
        <CiSearch className='text-white w-8 h-8 object-cover'/>
        <IoIosNotifications className='text-white w-8 h-8 object-cover' />
        <FaUser className='text-white w-6 h-6 object-cover' />
        {
          mode === "light" ? <IoSunny className='text-white w-8 h-8 object-cover' onClick={() => dispatch(toggleTheme())} /> :
          <IoMdMoon className='text-white w-8 h-8 object-cover' onClick={() => dispatch(toggleTheme())} />
        }
        
      </div>
      </div>
      
    </div>
  )
}
