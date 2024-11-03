import React from 'react'
import Questions from '@/components/forms/questions'
const Page = () => {
  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>
        Ask a question
      </h1>
      <div className='mt-9'>
        <Questions />
      </div>
    </div>
  )
}

export default Page
