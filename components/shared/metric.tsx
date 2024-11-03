import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface metricType {
    imgUrl: string,
    alt: string,
    value: number | string,
    title: string,
    href?: string,
    textstyles?: string,
    isAuthor?: boolean
}


const metric = ({
    imgUrl,
    alt,
    value,
    title,
    href,
    textstyles,
    isAuthor
}: metricType) => {

    const MetricContent = (
        <>
            <p className={`flex items-center gap-1 ${textstyles}`}>
            <Image src={imgUrl} width={16} height={16} alt={alt} className={`object-contain ${href ? 'rounded-full' : ''}`} />
                {value}
                <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}>
                {title}
               </span>
            </p>
        </>
    )       

    if (href) {
        return (
            <Link href={href}>
                {MetricContent}
            </Link>
        )}

    return (
        <div className='flex-center flex-wrap gap-1'>
            {MetricContent}
        </div>
    )
}

export default metric
