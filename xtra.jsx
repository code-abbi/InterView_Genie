"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState, useMemo } from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({params}) {
  // The 'use' hook is experimental. For broader compatibility, you might consider passing params differently.
  // However, I will keep it as it was in your original code.
  const unwrappedParams = React.use(params);
  
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
     GetFeedback();
  }, [])

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdref, unwrappedParams.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  }

  // --- DYNAMIC RATING CALCULATION ---
  // useMemo is used for performance. It will only recalculate the rating
  // when the feedbackList state changes.
  const overallRating = useMemo(() => {
    if (!feedbackList || feedbackList.length === 0) {
      return 0; // Return 0 if there's no feedback to calculate
    }
    // Sum all the ratings from the list. We convert `item.rating` to a Number to ensure correct addition.
    const totalRating = feedbackList.reduce((acc, item) => acc + Number(item.rating), 0);
    // Calculate the average by dividing by the number of answers.
    const avgRating = totalRating / feedbackList.length;
    // Return the average formatted to one decimal place (e.g., 7.5)
    return avgRating.toFixed(1);
  }, [feedbackList]);


  return (
    <div className='p-10'>
   
      {feedbackList?.length == 0 ?
      <h2 className='font-bold text-xl text-gray-500'>No feedback available for this interview session.</h2> :
      <>
        <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
       
        {/* Display the dynamically calculated overall rating */}
        <h2 className='text-primary text-lg my-3'>Your overall rating: <strong>{overallRating}/10</strong></h2>

        <h2 className='text-sm text-gray-500'>Find below each question with the correct answer, your answer, and feedback for improvement.</h2>
        
        {feedbackList.map((item, index) => (
          <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg flex justify-between my-2 gap-10 w-full text-left'>
              {item.question}
              <ChevronsUpDown className='h-5 w-5 flex-shrink-0'/>
            </CollapsibleTrigger> 
            <CollapsibleContent>
              <div className='flex flex-col gap-2'>
                <h2 className='text-green-700 border p-2 rounded-lg bg-green-50'><strong>Rating:</strong> {item.rating}</h2>
                <h2 className='p-2 border rounded-lg text-sm bg-red-50 text-red-900'><strong>Your Answer:</strong> {item.userAns}</h2>
                <h2 className='p-2 border rounded-lg text-sm bg-green-50 text-green-900'><strong>Correct Answer:</strong> {item.correctAns}</h2>
                <h2 className='p-2 border rounded-lg text-sm bg-blue-50 text-blue-900'><strong>Feedback:</strong> {item.feedback}</h2>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </>
      }
      <Button onClick={() => router.replace('/dashboard')} className="mt-8">Go to Dashboard</Button>
    </div>
  )
}

export default Feedback
