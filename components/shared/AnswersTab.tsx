import { getUserAnswers } from '@/lib/actions/user.action';
import { SearchParamsProps } from '@/types'
import React from 'react'

import AnswerCard from '../cards/AnswerCard';


interface props extends SearchParamsProps {
    userId: string;
    clerkId?: string | null;
}


const AnswersTab = async ({userId, clerkId} : props) => {
    const result = await getUserAnswers({
        userId,
        page: 1,
    })
  return (
    <>
        {result?.answers.map((answers) => (
        <AnswerCard
        key={answers._id}
        _id={answers._id}
        clerkId={clerkId}
        question={answers.question}
        author={answers.author}
        upvotes={answers.upvotes}
        createdAt={answers.createdAt}
      />
      ))}
    </>
  )
}

export default AnswersTab
