import React, { useState } from 'react'

type SwitchButtonPropsType = {
    option1: string;
    option2: string;
    state: boolean;
    switchFunction: ()=> void;
}

export default function SwitchButton({option1, option2, state, switchFunction}: SwitchButtonPropsType) {

  return (
    <div className='flex items-center justify-between overflow-hidden rounded-full border border-[var(--primary-blue)]'>
        <button onClick={switchFunction} className={`text-[#808080] w-[50%] text-base py-2 px-4 rounded-full cursor-pointer ${state ? 'bg-[var(--primary-blue)] text-white' : 'bg-transparent'}`}>{option1}</button>
        <button onClick={switchFunction} className={`text-[#808080] w-[50%] text-base py-2 px-4 rounded-full cursor-pointer ${state ? ' bg-transparent' : 'bg-[var(--primary-blue)] text-white'}`}>{option2}</button>
    </div>
  )
}
