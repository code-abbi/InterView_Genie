"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { use, useEffect, useMemo, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown, CheckCircle, XCircle, Lightbulb, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

// --- Helper Component for the Rating Circle ---
const RatingCircle = ({ rating }) => {
  const percentage = (rating / 10) * 100;
  const circumference = 2 * Math.PI * 52; // 2 * pi * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let circleColor = 'stroke-green-500';
  if (rating < 7) circleColor = 'stroke-orange-500'; // Changed from yellow
  if (rating < 4) circleColor = 'stroke-red-500';

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
        <circle
          className={`transition-all duration-1000 ease-in-out ${circleColor}`}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
      </svg>
      <span className="absolute top-1/2 right-1/2 text-3xl font-bold text-gray-700">
        {rating}</span>
    </div>
  );
};


function Feedback({params}) {
  const unwrappedParams = use(params);
  
  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
     GetFeedback();
  },[]);

  const GetFeedback = async () => {
    const result = await db.select()
    .from(UserAnswer)
    .where(eq(UserAnswer.mockIdref, unwrappedParams.interviewId))
    .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);
  }

  const overallRating = useMemo(() => {
      if (!feedbackList || feedbackList.length === 0) {
        return 0; 
      }
      const totalRating = feedbackList.reduce((acc, item) => acc + Number(item.rating), 0);
      const avgRating = totalRating / feedbackList.length;
      return avgRating.toFixed(1);
  }, [feedbackList]);

  const getRatingMessage = (rating) => {
    if (rating >= 8) return "Excellent Work!";
    if (rating >= 6) return "Good Job, Keep Practicing!";
    if (rating >= 4) return "Solid Effort, Room for Improvement!";
    return "Keep Trying, You'll Get There!";
  }

  return (
    <div className='p-4 md:p-10 min-h-screen'>
      <div className="max-w-4xl mx-auto">
        {feedbackList?.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-lg shadow-md">
            <h2 className='font-bold text-2xl text-gray-600'>No Feedback Available</h2>
            <p className="text-gray-500 mt-2">It seems this interview session was not completed.</p>
            <Button onClick={() => router.replace('/dashboard')} className="mt-6">Back to Dashboard</Button>
          </div>
        ) : (
          <>
            {/* --- Overall Score Card --- */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg text-center mb-8">
              <h1 className='text-2xl md:text-3xl font-bold text-orange-500'>{getRatingMessage(overallRating)}</h1>
              <p className='text-gray-500 mt-1'>Here is a summary of your interview performance.</p>
              <h2 className='text-xl font-semibold text-gray-700'>Your Overall Rating</h2>
              <div className="flex justify-center my-6">
                <RatingCircle rating={overallRating} />
              </div>
            </div>

            {/* --- Detailed Feedback Section --- */}
            <h2 className='text-2xl font-bold text-orange-500 mb-4'>Detailed Breakdown</h2>
            <div className="space-y-4">
              {feedbackList.map((item, index) => (
                <Collapsible key={index} className='bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg hover:ring-2 hover:ring-orange-400'>
                  <CollapsibleTrigger className='p-4 flex justify-between items-center w-full text-left font-semibold text-gray-700 hover:bg-gray-50'>
                    <span>{index + 1}. {item.question}</span>
                    <div className="flex items-center gap-2">
                        <span className={`font-bold ${item.rating > 7 ? 'text-green-600' : item.rating > 4 ? 'text-orange-600' : 'text-red-600'}`}>
                            {item.rating}/10
                        </span>
                        <ChevronsUpDown className='h-5 w-5 text-gray-500 flex-shrink-0' />
                    </div>
                  </CollapsibleTrigger> 
                  <CollapsibleContent className="border-t border-gray-200">
                    <div className='p-4 space-y-4'>
                      {/* Your Answer */}
                      <div className="p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                        <div className="flex items-center gap-2 text-red-800 font-semibold">
                          <XCircle className="h-5 w-5" />
                          <h3>Your Answer</h3>
                        </div>
                        <p className="text-red-700 mt-1 pl-7 text-sm">{item.userAns}</p>
                      </div>

                      {/* Correct Answer */}
                      <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                        <div className="flex items-center gap-2 text-green-800 font-semibold">
                          <CheckCircle className="h-5 w-5" />
                          <h3>Correct Answer</h3>
                        </div>
                        <p className="text-green-700 mt-1 pl-7 text-sm">{item.correctAns}</p>
                      </div>

                      {/* Feedback */}
                      <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                        <div className="flex items-center gap-2 text-orange-800 font-semibold">
                          <Lightbulb className="h-5 w-5" />
                          <h3>Feedback for Improvement</h3>
                        </div>
                        <p className="text-orange-700 mt-1 pl-7 text-sm">{item.feedback}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button onClick={() => router.replace('/dashboard')}>Back to Dashboard</Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Feedback;
