"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { use, useEffect, useState } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({params}) {
  const unwrappedParams = use(params);
  
  const [feedbackList,setfeedbackList]=useState([]);
  const router=useRouter();
  useEffect(() => {
     GetFeedback();
  },[])

  const GetFeedback= async()=> {
    const result=await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdref,unwrappedParams.interviewId))
    .orderBy(UserAnswer.id);

    console.log(result);
    setfeedbackList(result);
  }

  return (
    <div className='p-10'>
   
      {feedbackList?.length==0?
      < h2 className='font-bold text-xl text-grey-500'> User has not given answer to any of the question.</h2>:
      <>
      <h2 className='text-3xl fonst-bold text-green-500'>Congratulation</h2>
      <h2 className='font-bolf text-2xl'> Here is your interview feedback</h2>
       

      <h2 className='text-primary text-lg my-3'>Your overall rating :<strong>7/10</strong></h2>
      <h2 className='text-sm text-gray-500'>Find below question with correct answer,your answer and feedback for improvement </h2>
      {feedbackList&&feedbackList.map((item,index)=>(

        <Collapsible key={index} className='mt-7'>
        <CollapsibleTrigger className='p-2 bg-secondary 
         rounded-lg flex justify-between  my-2  gap-10 w-full'>
        {item.question}
        <ChevronsUpDown className='h-5 w-5'/>
        </CollapsibleTrigger> 
        <CollapsibleContent>
           <div className=' flex flex-col gap-2'>
            <h2 className=' text-green-500 border p-2 rounded-lg '><strong>Rating:</strong>{item.rating}</h2>
            <h2 className='p-2 border rounded-lg text-sm  bg-red-50 text-red-800'><strong>Your Answer:</strong>{item.userAns}</h2>
             <h2 className='p-2 border rounded-lg text-sm  bg-green-50 text-green-800'><strong>Correct Answer:</strong>{item.correctAns}</h2>
           <h2 className='p-2 border rounded-lg text-sm  bg-orange-50 text-primary'><strong>Feedback:</strong>{item.feedback}</h2>

           </div>
        </CollapsibleContent>
        </Collapsible>
      ))}
      </>
       }
      <Button onClick={()=>router.replace('/dashboard')}>Home</Button>
      
    
    </div>
  )
}

export default Feedback
