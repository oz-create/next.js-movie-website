import Link from 'next/link';
import React from 'react'
import { FaArrowRight } from "react-icons/fa";

export default function SeeMoreButton({link}: {link: string}) {
  return (
    <Link href={link}>
        <div className="flex items-center justify-center gap-2 cursor-pointer text-[var(--primary-blue)] hover:text-[var(--color-primary)] transition">
            <span className='text-inherit text-xl'>See More</span>
            <FaArrowRight className='text-inherit'/>
        </div>
       
    </Link>
  )
}
