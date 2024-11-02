"use client"

import React from 'react';
import Questions from '@/components/forms/questions';
import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
import { getUserById } from '@/lib/actions/user.action'; 
import { useEffect, useState } from 'react';
const Page = async () => {
  
  const [userId, setUserId] = useState<string | null>(null);

  // Using useEffect to fetch userId asynchronously
  useEffect(() => {
    const fetchAuth = async () => {
      const authData = await auth();
      setUserId(authData.userId);
    };
    fetchAuth();
  }, []);


  if (!userId) {
    redirect('/sign-in');
  }


    const mongoUser = await getUserById(userId); // Pass as an object

    if (!mongoUser) {
      console.error("User not found in the database");
    } else {
      // console.log("this is the mongo user : ", mongoUser); // Check the user data in the console
    }
  
    
 

  return (
    <div>
      <h1 className='h1-bold text-dark100_light900'>
        Ask a question
      </h1>
      <div className='mt-9'>
        <Questions mongoUserId={JSON.stringify(mongoUser.id)}/>
      </div>
    </div>
  );
}

export default Page;
