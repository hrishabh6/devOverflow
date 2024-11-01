import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import Renderedtag from './Renderedtag';
const hotQuestions = [
    {
        id: '1',
        title: 'How to use React Query with Next.js?',
    },
    {
        id: '2',
        title: 'Cascading Dropdown in React',
    },
    {
        id: '3',
        title: 'how to perfetly center a div in css?',
    },
    {
        id: '4',
        title: 'best practices for React Native?',
    },
    {
        id: '5',
        title: 'redux vs context api',
    }
]

const Populartags = [
    {
        id: '1',
        name: 'React',
        totalQuestions: 10
    },
    {
        id: '2',
        name: 'java',
        totalQuestions: 100
    },
    {
        id: '3',
        name: 'javascript',
        totalQuestions: 1000
    },
    {
        id: '4',
        name: 'python',
        totalQuestions: 130
    },
    {
        id: '5',
        name: 'Nextjs',
        totalQuestions: 104
    },
]
const rightsidebar = () => {
    return (
        <section className='background-light900_dark200 light-border sticky right-0 top-0 flex h-[96vh] flex-col  overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden w-[350px] max-xl:hidden'>
            <div>
                <h3 className='h3-bold text-dark200_light900'>Top Questions</h3>
                <div className='mt-7 flex w-full flex-col gap-[30px]'>
                    {hotQuestions.map((question) => (
                        <Link href={`/questions/${question.id}`} key={question.id} className='flex cursor-pointer items-center justify-between gap-7'>
                            <p className='body-medium text-dark500_light700 '>{question.title}</p>
                            <Image src="/assets/icons/chevron-right.svg" alt='Chevron-right' width={20} height={20} className='invert-colors' />
                        </Link>
                    ))}
                </div>
            </div>
            <div className='mt-16'> 
                <h3 className='h3-bold text-dark200_light900'>Popular Tags</h3>
                <div className='mt-7 flex flex-col gap-4'>
                    {Populartags.map((tag) => (
                        <Renderedtag key={tag.id} id={tag.id} name={tag.name} totalQuestions={tag.totalQuestions} showCount/>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default rightsidebar
