"use client"

import { HomePageFilters } from '@/constants/filters'
import React from 'react'
import { Button } from '../ui/button'
import { Item } from '@radix-ui/react-menubar'

const homefilters = () => {
  const active = 'newest'
  return (
    <div className='mt-10  flex-wrap gap-3 md:flex hidden '>
      {HomePageFilters.map((item) => (
        <Button key={item.value} onClick={()=>{}} className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === item.value? 'bg-primary-100 text-primary-500  dark:bg-dark-400': 'bg-light-800 text-light-500 dark:text-light-500 dark:bg-dark-300'}`}>
          {item.name}
        </Button>
      ))}  
    </div>
  )
}

export default homefilters
