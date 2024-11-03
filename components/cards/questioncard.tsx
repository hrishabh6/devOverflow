import React from 'react'
import Link from 'next/link'
import Renderedtag from '../shared/Renderedtag';
import Metric from '../shared/metric';
import { getTimeStamp } from '@/lib/utils';
import { formatNumberWithSuffix } from '@/lib/utils';
interface props {
    id: string;
    title: string;
    tags: {id: string, name: string}[];
    author: {
        id: string;
        name: string;
        picture: string;
    };
    upvotes: number;
    views: number;
    answers: Array<object>;
    createdAt: Date;
}

const questioncard = ({
    id,
    title,
    tags,
    author,
    views,
    upvotes,
    answers,
    createdAt
}: props) => {
  return (
    <div className='card-wrapper p-9 sm:px-11 rounded-[10px]'>
        <div className='flex flex-col-reverse items-start justify-between sm:flex-row gap-5 '>
            <div>
                <span className='subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden '>
                    {getTimeStamp(createdAt)}
                </span>
                <Link href={`/question/${id}`}>
                    <h3 className='sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1'>
                        {title}
                    </h3>
                </Link>
            </div>
            {/* todo if signed in add edit and delete for the creater of the user */}
        </div>
        <div className='mt-3.5 flex flex-wrap gap-2 '>
            {
                tags.map((tag) => (
                    <Renderedtag
                        key={tag.id}
                        id={tag.id}
                        name={tag.name}
                        
                    />
                ))
            }
        </div>
        <div className='flex-between mt-6 w-full flex-wrap gap-3'>
            <Metric
                imgUrl={author.picture}
                alt="user"
                value={author.name}
                title={` - asked ${getTimeStamp(createdAt)}`}
                href={`/profile/${author.id}`}
                isAuthor
                textstyles="body-medium text-dark400_light700 "
            />
            <Metric
                imgUrl="/assets/icons/like.svg"
                alt="upvotes"
                value={formatNumberWithSuffix(upvotes)}
                title=" Votes"
                textstyles="small-medium text-dark400_light800 "
            />
            <Metric
                imgUrl="/assets/icons/message.svg"
                alt="message"
                value={formatNumberWithSuffix(answers.length)}
                title=" Answers"
                textstyles="small-medium text-dark400_light800 "
            />
            <Metric
                imgUrl="/assets/icons/eye.svg"
                alt="eye"
                value={formatNumberWithSuffix(views)}
                title=" Views"
                textstyles="small-medium text-dark400_light800 "
            />
        </div>
    </div>
  )
}

export default questioncard
