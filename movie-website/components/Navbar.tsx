"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiSearch } from "react-icons/ci";
import { IoSunny } from "react-icons/io5";
import { IoMdMoon } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { toggleTheme } from '@/store/slices/themeSlice';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseOutline } from "react-icons/io5";

export default function Navbar() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state: RootState) => state.theme);
  const [toggleMenu, setToggleMenu] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  function navbarToggle() {
    setToggleMenu(!toggleMenu)
  }
  
    useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setToggleMenu(false);
      }
    }

    if (toggleMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/#pricing", label: "Pricing" },
    { href: "/movies", label: "Movies" },
    { href: "/series", label: "Series" },
    { href: "/collection", label: "Collection/Seasons" },
    { href: `${pathname}/#faq`, label: "FAQ" },
  ];
  return (
    <div className="flex justify-center w-full fixed top-9 z-100 px-5">
      <div ref={navRef} className='relative h-20 max-w-7xl w-full flex items-center justify-between inset-0 rounded-2xl gradient-border pr-5 bg-[var(--light-color)]'>
        <Link href={"/"} className='z-1'>
          <Image
            src={`${mode === "dark" ? "/Logo-light.png" : "/Logo-dark.png"}`}
            width={92}
            height={92}
            alt="logo light"
            className='w-23 h-23'
          />
        </Link>
        
      <div className={`navMenu ${toggleMenu ? "right-0" : "right-[-120vw]"} transition-all flex items-center justify-center lg:gap-8 gap-11 z-10  absolute lg:relative flex-col lg:flex-row  h-[30rem] lg:h-auto right-0 lg:right-auto w-[20rem] lg:w-auto top-[6rem] lg:top-auto bg-[var(--light-color)] rounded-2xl`}>
        {
          links.map((link,index) => (
            <Link onClick={navbarToggle} key={index} href={link.href} className={`text-[var(--color-primary)] text-2xl relative transition-all ${link.href === pathname ? "after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[4px] after:bg-[var(--primary-blue)] after:blur-[2px]" : ""}`}>{link.label}</Link>
          ))
        }
        
      </div>
      <div className='flex items-center justify-center gap-8 z-10'>
        <CiSearch className='text-[var(--color-primary)] w-8 h-8 object-cover'/>
       
        {
          mode === "light" ? <IoSunny className='text-[var(--color-primary)] w-8 h-8 object-cover cursor-pointer' onClick={() => dispatch(toggleTheme())} /> :
          <IoMdMoon className='text-[var(--color-primary)] w-8 h-8 object-cover cursor-pointer' onClick={() => dispatch(toggleTheme())} />
        }
        <div onClick={navbarToggle} className='lg:hidden w-[2.5rem]'>
          {
            toggleMenu ?   <IoCloseOutline className='text-4xl text-[var(--color-primary)]'/> : <RxHamburgerMenu className='text-3xl text-[var(--color-primary)]' />
          }
          
         
        </div>
     
        
      </div>
      </div>
      
    </div>
  )
}
