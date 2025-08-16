"use client";
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { use, useEffect, useState } from 'react';
import QuestionSection from './_components/QuestionSection';
import { Lightbulb, WebcamIcon, Mic } from 'lucide-react';
import dynamic from 'next/dynamic'; // STEP 1: Import dynamic
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// STEP 2: Dynamically import the component with server-side rendering disabled
const RecordAnswerSection = dynamic(
    () => import('./_components/RecordAnswerSection'), 
    { ssr: false }
);

function StartInterview({params}) {
   const unwrappedParams = use(params);
   const [interviewData,setInterviewData] = useState(null);
   const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
   const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
   const [webcamEnabled, setWebcamEnabled] = useState(false);

   useEffect(() => {
     const fetchData = async () => {
         const result = await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId, unwrappedParams.interviewId));
         
          if (result && result.length > 0 && result[0].jsonMockResp) {
              const parsedData = JSON.parse(result[0].jsonMockResp);
              setMockInterviewQuestion(Array.isArray(parsedData) ? parsedData : []);
              setInterviewData(result[0]);
          }
       };
       fetchData();
   }, [unwrappedParams.interviewId]);

  return (
    <div className='my-10'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
         {/* questions section */}
            <div className='flex flex-col gap-5'>
                 <div className='p-5 border rounded-lg'>
                     <QuestionSection 
                       mockInterviewQuestion={mockInterviewQuestion} 
                       activeQuestionIndex={activeQuestionIndex}
                     />
                     <div className='p-5 border rounded-lg mt-5'>
                         {mockInterviewQuestion[activeQuestionIndex]?.question}
                        
                     </div>
                     <div className='p-5 border-l-4 border-yellow-400 bg-yellow-50 rounded-lg mt-5'>
                        <h2 className='flex gap-2 items-center text-yellow-700 font-semibold'>
                           <Lightbulb />
                           Note:
                        </h2>
                        <p className='mt-2 text-yellow-600 text-sm'>
                           Click on Record Answer when you want to answer the question. At the end of the interview we will give you the feedback .
                        </p>
                     </div>
                 </div>
            </div>
            {/* webcam section */}
           <RecordAnswerSection 
              webcamEnabled={webcamEnabled} 
              setWebcamEnabled={setWebcamEnabled}
               mockInterviewQuestion={mockInterviewQuestion} 
              activeQuestionIndex={activeQuestionIndex}
              interviewData={interviewData}
            />
        </div>
        <div className='flex justify-end gap-6 mt-5'>
        {activeQuestionIndex!=mockInterviewQuestion?.length-1&&
        <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}> Next question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1&& 
        <Link href={'/dashboard/interview/'+interviewData?.mockId +'/feedback'}>
          <Button>Finish Interview</Button>
        </Link>
        }

     
        </div>
    </div>
  );
}

export default StartInterview;