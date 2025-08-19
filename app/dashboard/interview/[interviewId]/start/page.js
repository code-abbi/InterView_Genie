"use client";
import { db } from '@/utils/db';
import { MockInterview , UserAnswer } from '@/utils/schema';
import { eq,and } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import { Lightbulb, WebcamIcon, Mic } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

const RecordAnswerSection = dynamic(
    () => import('./_components/RecordAnswerSection'), 
    { ssr: false }
);

function StartInterview({params}) {
   const unwrappedParams = use(params);
   const { user } = useUser();
   const [interviewData,setInterviewData] = useState(null);
   const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
   const [webcamEnabled, setWebcamEnabled] = useState(false);
   const router = useRouter();
useEffect(() => {
  const fetchDataAndClearPrevious = async () => {
     if (unwrappedParams.interviewId && user) {
         // First, delete any previous answers for this interview session and user
         await db.delete(UserAnswer).where(
             and(
                 eq(UserAnswer.mockIdref, unwrappedParams.interviewId),
                 eq(UserAnswer.userEmail, user.primaryEmailAddress.emailAddress)
             )
         );

         // Then, fetch the interview questions
         const result = await db.select().from(MockInterview)
             .where(eq(MockInterview.mockId, unwrappedParams.interviewId));

         if (result && result.length > 0 && result[0].jsonMockResp) {
             const parsedData = JSON.parse(result[0].jsonMockResp);
             setMockInterviewQuestion(Array.isArray(parsedData) ? parsedData : []);
             setInterviewData(result[0]);
         }
     }
  };
  fetchDataAndClearPrevious();
}, [unwrappedParams.interviewId, user]);

const handleAnswerSubmission = () => {
    if (activeQuestionIndex < mockInterviewQuestion.length - 1) {
        // If it's not the last question, go to the next one
        setActiveQuestionIndex(activeQuestionIndex + 1);
    } else {
        // If it is the last question, navigate to the feedback page
        router.push(`/dashboard/interview/${interviewData?.mockId}/feedback`);
    }
};

  return (
    <div >
      <div className='text-center mb-10'>
            <h2 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 bg-[length:200%_auto] animate-background-pan'>
                Your Stage is Set. Good Luck!
            </h2>
            <p className='text-gray-500 mt-2'>Focus, breathe, and show them what you've got.</p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
         {/* questions section */}
            <div className='flex flex-col gap-5'>
                 <div className='p-5 border rounded-lg'>
                     <QuestionSection 
                       mockInterviewQuestion={mockInterviewQuestion} 
                       activeQuestionIndex={activeQuestionIndex}
                     />
                 </div>
            </div>
            {/* webcam section */}
           <RecordAnswerSection 
              webcamEnabled={webcamEnabled} 
              setWebcamEnabled={setWebcamEnabled}
               mockInterviewQuestion={mockInterviewQuestion} 
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
              onAnswerSubmitted={handleAnswerSubmission}
            />
        </div>

    <div className='flex items-center w-full mt-10'>
    {/* Left Spacer - Pushes the center button into the middle */}
    <div className='flex-1'></div>

    {/* Centered "End Interview" Button */}
    <div className='flex-1 flex justify-center'>
        <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
            <Button
                variant="destructive" // This makes the button red
            >
                End Interview
            </Button>
        </Link>
    </div>

    {/* Right-aligned "Next" and "Finish" Buttons */}
    <div className='flex-1 flex justify-end gap-6'>
        {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
            <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                Next question
            </Button>
        )}

        {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
            <Link href={'/dashboard/interview/' + interviewData?.mockId + '/feedback'}>
                <Button>Finish Interview</Button>
            </Link>
        )}
    </div>
    </div>
    </div>
  );
}

export default StartInterview;