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
import { ChevronsUpDown, XCircle, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

// --- Helper Component for the Rating Circle ---
const RatingCircle = ({ rating }) => {
  const percentage = (rating / 10) * 100;
  const circumference = 2 * Math.PI * 52; // 2 * pi * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  let circleColor = 'stroke-green-500';
  if (rating < 7) circleColor = 'stroke-orange-500';
  if (rating < 4) circleColor = 'stroke-red-500';

  return (
   <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
      <svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid meet" className="transform -rotate-90 w-full h-full block">
        <circle
          // CHANGE: Made track more transparent
          className="text-slate-300/50 dark:text-slate-700/50"
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
      {/* CHANGE: Updated text color for contrast */}
      <span className="absolute text-3xl font-bold text-slate-800 dark:text-slate-200">
        {rating}
      </span>
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
          // CHANGE: Applied glass-effect to this card
          <div className="text-center p-10 glass-effect rounded-2xl shadow-lg">
            <h2 className='font-bold text-2xl text-slate-800 dark:text-slate-200'>No Feedback Available</h2>
            <p className="text-slate-600 dark:text-slate-400 mt-2">It seems this interview session was not completed.</p>
            <Button onClick={() => router.replace('/dashboard')} className="mt-6">Back to Dashboard</Button>
          </div>
        ) : (
          <>
            {/* --- Overall Score Card --- */}
            {/* CHANGE: Applied glass-effect to this card and updated text colors */}
            <div className="glass-effect p-6 md:p-8 rounded-2xl shadow-lg text-center mb-8">
              <h1 className='text-2xl md:text-3xl font-bold text-orange-500'>{getRatingMessage(overallRating)}</h1>
              <p className='text-slate-600 dark:text-slate-400 mt-1'>Here is a summary of your interview performance.</p>
              <h2 className='text-xl font-semibold text-slate-800 dark:text-slate-200'>Your Overall Rating</h2>
              <div className="flex justify-center my-6">
                <RatingCircle rating={overallRating} />
              </div>
            </div>

            {/* --- Detailed Feedback Section --- */}
            <h2 className='text-2xl font-bold text-orange-500 mb-4'>Detailed Breakdown</h2>
            <div className="space-y-4">
              {feedbackList.map((item, index) => (
                // CHANGE: Applied glass-effect to collapsible cards
                <Collapsible key={index} className='glass-effect rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl'>
                  <CollapsibleTrigger className='p-4 flex justify-between items-center w-full text-left font-semibold text-slate-800 dark:text-slate-200 hover:bg-white/10 dark:hover:bg-black/10'>
                    <span>{index + 1}. {item.question}</span>
                    <div className="flex items-center gap-2">
                        <span className={`font-bold ${item.rating > 7 ? 'text-green-500' : item.rating > 4 ? 'text-orange-500' : 'text-red-500'}`}>
                            {item.rating}/10
                        </span>
                        <ChevronsUpDown className='h-5 w-5 text-gray-500 flex-shrink-0' />
                    </div>
                  </CollapsibleTrigger> 
                  <CollapsibleContent className="border-t border-white/20 dark:border-white/10">
                    <div className='p-4 space-y-4'>
                      {/* Your Answer - CHANGE: Made background semi-transparent */}
                      <div className="p-3 bg-red-500/10 border-l-4 border-red-500/50 rounded-r-lg">
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-semibold">
                          <XCircle className="h-5 w-5" />
                          <h3>Your Answer</h3>
                        </div>
                        <p className="text-red-800 dark:text-red-300 mt-1 pl-7 text-sm">{item.userAns}</p>
                      </div>

                      {/* Feedback - CHANGE: Made background semi-transparent */}
                      <div className="p-3 bg-green-500/10 border-l-4 border-green-500/50 rounded-r-lg">
                        <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
                          <Lightbulb className="h-5 w-5" />
                          <h3>Feedback for Improvement</h3>
                        </div>
                        <p className="text-green-800 dark:text-green-300 mt-1 pl-7 text-sm">{item.feedback}</p>
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
