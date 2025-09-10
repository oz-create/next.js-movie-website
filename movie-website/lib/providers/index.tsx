"use client"

import ThemeWrapper from '@/components/ThemeWrapper'
import { store } from '@/store/store'
import React from 'react'
import { Provider } from 'react-redux'

export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <Provider store={store}>
      <ThemeWrapper>
           {children}
      </ThemeWrapper>
    </Provider>
   
  )
}
