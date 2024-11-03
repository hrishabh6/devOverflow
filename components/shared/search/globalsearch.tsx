import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'

const globalsearch = () => {
  return (
    <div className='relative w-full max-w-[600px] max-lg:hidden '>
      <div className='background-light800_darkgradient relative flex min-h-[56px] grow gap-1 rounded-xl px-4 items-center'>
        <Image src='/assets/icons/search.svg' width={24} height={24} alt='Search icon' className='cursor-pointer'/>
        <Input type='text' placeholder='Search Globally' className='paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none'/>
      </div>
    </div>
  )
}

export default globalsearch
