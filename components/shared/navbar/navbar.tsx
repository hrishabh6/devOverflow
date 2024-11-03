
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import { SignedIn, SignedOut } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs';
import Theme from './Themes';
import MobileNav from './mobilenav';
import GlobarSearch from '../search/globalsearch';
const navbar = () => {

    return (
        <nav className='flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12'>
            <Link href='/' className='flex items-center gap-1'>
                <Image
                    src={"/assets/images/site-logo.svg"}
                    width={23}
                    height={23}
                    alt="DevFlow"
                />
                <p className='h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden'>Dev<span className='text-primary-500'>Overflow</span></p>
            </Link>
            <GlobarSearch/>

            <div className='flex-between gap-5'>
                <Theme />
                <SignedIn>
                    <UserButton
                        
                        appearance={{
                            elements: {
                                avatarBox: 'md:h-10 md:w-10'
                            },
                            variables: {
                                colorPrimary: '#ff7000',
                            }
                        }}
                    />
                </SignedIn>
                <MobileNav />
            </div>
        </nav>
    )
}

export default navbar
