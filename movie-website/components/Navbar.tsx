"use client"

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiSearch } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { usePathname } from 'next/navigation';

export default function Navbar() {
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
    <div className="flex justify-center w-full fixed top-9">
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
          links.map((link) => (
            <Link href={link.href} className={`text-white text-2xl relative transition-all ${link.href === pathname ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[4px] after:bg-[var(--primary-blue)] after:blur-[2px]" : ""}`}>{link.label}</Link>
          ))
        }
        
      </div>
      <div className='flex items-center justify-center gap-8 z-10'>
        <CiSearch className='text-white w-8 h-8 object-cover'/>
        <IoIosNotifications className='text-white w-8 h-8 object-cover' />
        <FaUser className='text-white w-6 h-6 object-cover' />
        <IoSunny className='text-white w-7 h-7 object-cover' />
      </div>
      </div>
      
    </div>
  )
}
