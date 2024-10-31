"use client"
import React from 'react'
import Image from 'next/image';
import { sidebarLinks } from '@/constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignedOut } from '@clerk/nextjs';
const leftsidebar = () => {
    const pathname = usePathname();
    return (
        <section className='background-light900_dark200 light-border sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]'>
            <div className='flex flex-1 flex-col gap-6'>
                {sidebarLinks.map((item) => {
                    const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
                    return (

                        <Link href={item.route} key={item.route}
                            className={`${isActive
                                ? 'primary-gradient rounded-lg text-light-900'
                                : 'text-dark300_light900'} flex items-center justify-start gap-4 bg-transparent p-4`}
                        >
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                width={16}
                                height={16}
                                className={`${isActive ? "" : 'invert-colors'}`}
                            />
                            <p className={`${isActive ? 'base-bold' : 'base-medium'} max-lg:hidden`}>{item.label}</p>
                        </Link>


                    )
                })}
                <SignedOut>
                <Link href="/sign-up">
                    <Button className='small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                            <Image src="/assets/icons/account.svg" alt='Account pp' width={20} height={20} className='invert-color lg:hidden' />
                        <span className='primary-text-gradient max-lg:hidden'>
                            Log-In
                        </span>
                    </Button>
                </Link>
                <Link href="/sign-in">
                    <Button className='small-medium btn-tertiary light-border-2 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none'>
                    <Image src="/assets/icons/account.svg" alt='Account pp' width={20} height={20} className='invert-color lg:hidden' />
                        <span className=' max-lg:hidden'>
                            Sign-Up
                        </span>
                    </Button>
                </Link>
                </SignedOut>
            </div>
        </section>
    )
}

export default leftsidebar
