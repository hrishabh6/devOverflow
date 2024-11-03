import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'

interface Props {
    title: string;
    description: string;
    link: string;
    linktitle: string;
}

const NoResult = ({ title, description, link, linktitle }: Props) => {
  return (
    <div className='mt-10 flex w-full flex-col items-center justify-center'>
        <Image src='/assets/images/light-illustration.png' alt='No result found' width={270} height={200} className='dark:hidden block object-contain'/>
        <Image src='/assets/images/dark-illustration.png' alt='No result found' width={270} height={200} className='hidden dark:block object-contain'/>
        <h2 className='h2-bold text-dark200_light900 mt-8'>
            {title}
        </h2>
        <p className='body-regular text-dark500_light700 my-3.5 max-w-md text-center'>
            {description}
        </p>
        <Link href={link}> 
            <Button className='paragraph-medium mt-5 min-h-[46px] rounded-lg bg-primary-500 px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900'>
                {linktitle}
            </Button>
        </Link>
    </div>
  )
}

export default NoResult
