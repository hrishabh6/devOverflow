import React from 'react'
import Questions from '@/components/forms/questions'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { getUserById } from '@/lib/actions/user.action'
const Page = async () => {

  // const {userId} = await auth()

  const userId = '12345abcde'

  if(!userId) {
    redirect('/sign-in')
  }

  const mongoUser = await getUserById({userId})


  console.log(mongoUser)

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>
        Ask a question
      </h1>
      <div className='mt-9'>
        <Questions mongoUserId={JSON.stringify(mongoUser._id)}/>
      </div>
    </div>
  )
}

export default Page
