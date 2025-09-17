"use client"
import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { MdExpandMore } from "react-icons/md";
import { FaInstagram } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <div id='faq' className='bg-linear-to-b  from-[var(--light-color)]  to-[var(--primary-blue)] dark:to-[#9747FF] flex flex-col justify-center items-center px-10 py-20'>
        <h1 className='text-5xl font-bold text-[var(--color-primary)] mb-15'>The OzCreate Questions Everyone`s Asking</h1>
        <Accordion sx={{backgroundColor:"transparent", border:"1px solid #E93F9C", margin:"0.5rem 0", borderRadius:"1rem !important", boxShadow:"none !important",  "&::before": {
      display: "none", // pseudo-elementi tamamen kaldırır
    }, }}>
        <AccordionSummary
          expandIcon={<MdExpandMore className='text-xl text-[var(--color-primary)]'/>}
          aria-controls="panel1-content"
          id="panel1-header"
        >
        <p className='text-xl font-bold text-[var(--color-primary)]'>What is OzCreate ?</p>
        </AccordionSummary>
        <AccordionDetails sx={{fontSize:"1rem", color:"var(--color-primary)"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{backgroundColor:"transparent", border:"1px solid #E93F9C", margin:"0.5rem 0", borderRadius:"1rem !important", boxShadow:"none !important",  "&::before": {
      display: "none", // pseudo-elementi tamamen kaldırır
    }, }}>
        <AccordionSummary
          expandIcon={<MdExpandMore className='text-xl text-[var(--color-primary)]'/>}
          aria-controls="panel2-content"
          id="panel2-header"
        >
        <p className='text-xl font-bold text-[var(--color-primary)]'>What is OzCreate ?</p>
        </AccordionSummary>
        <AccordionDetails sx={{fontSize:"1rem", color:"var(--color-primary)"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{backgroundColor:"transparent", border:"1px solid #E93F9C", margin:"0.5rem 0", borderRadius:"1rem !important", boxShadow:"none !important",  "&::before": {
      display: "none", // pseudo-elementi tamamen kaldırır
    }, }}>
        <AccordionSummary
          expandIcon={<MdExpandMore className='text-xl text-[var(--color-primary)]'/>}
          aria-controls="panel2-content"
          id="panel2-header"
        >
        <p className='text-xl font-bold text-[var(--color-primary)]'>Is OzCreate Good For Kids & Families?</p>
        </AccordionSummary>
        <AccordionDetails sx={{fontSize:"1rem", color:"var(--color-primary)"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{backgroundColor:"transparent", border:"1px solid #E93F9C", margin:"0.5rem 0", borderRadius:"1rem !important", boxShadow:"none !important",  "&::before": {
      display: "none", // pseudo-elementi tamamen kaldırır
    }, }}>
        <AccordionSummary
          expandIcon={<MdExpandMore className='text-xl text-[var(--color-primary)]'/>}
          aria-controls="panel2-content"
          id="panel2-header"
        >
        <p className='text-xl font-bold text-[var(--color-primary)]'>How much Does OzCreate Cost?</p>
        </AccordionSummary>
        <AccordionDetails sx={{fontSize:"1rem", color:"var(--color-primary)"}}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </AccordionDetails>
      </Accordion>
      <div className="flex items-center justify-center gap-10 mt-15">
          <FaInstagram className='text-3xl text-[var(--color-primary)] cursor-pointer hover:opacity-60 transition'/>
          <FaXTwitter className='text-3xl text-[var(--color-primary)] cursor-pointer hover:opacity-60 transition'/>
          <FaFacebook className='text-3xl text-[var(--color-primary)] cursor-pointer hover:opacity-60 transition'/>
          <FaLinkedin className='text-3xl text-[var(--color-primary)] cursor-pointer hover:opacity-60 transition'/>
      </div>
    </div>
  )
}
