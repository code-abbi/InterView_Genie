"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon ,Mic,Play} from 'lucide-react'
import { Inter } from 'next/font/google'
import React, { useEffect, useState, use } from 'react'
import Webcam from 'react-webcam'

function Interview(props) {
  const params = use(props.params); // Unwrap the promise
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));
      setInterviewData(result[0]);
     
    };
    fetchData();
  }, [params.interviewId]);
 return (
    <div className='my-10 flex flex-col items-center justify-center'>
      <h2 className='font-bold text-3xl text-gray-700 mb-6'>
        Let's Start the Interview
      </h2>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-5xl'>

        <div className='flex flex-col gap-6'>
          <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col gap-4'>
            {interviewData ? (
              <>
                <div>
                  <h3 className='text-sm font-medium text-gray-800'>Job Position</h3>
                  <p className='text-lg font-semibold text-gray-500'>{interviewData.jobPosition}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-800'>Job Description / Skills</h3>
                  <p className='text-lg font-semibold text-gray-500'>{interviewData.jobDesc}</p>
                </div>
                <div>
                  <h3 className='text-sm font-medium text-gray-800'>Years of Experience</h3>
                  <p className='text-lg font-semibold text-gray-500'>{interviewData.jobExperience}</p>
                </div>
              </>
            ) : (
              <div className='flex flex-col gap-4'>
                  <div className='h-6 bg-slate-200 rounded animate-pulse'></div>
                  <div className='h-6 bg-slate-200 rounded animate-pulse'></div>
                  <div className='h-6 bg-slate-200 rounded animate-pulse'></div>
              </div>
            )}
          </div>

          <div className='p-5 border-l-4 border-yellow-400 bg-yellow-50 rounded-lg'>
            <h2 className='flex gap-2 items-center text-yellow-700 font-semibold'>
              <Lightbulb />
              Information
            </h2>
            <p className='mt-2 text-yellow-600 text-sm'>
              {process.env.NEXT_PUBLIC_INFORMATION}
            </p>
          </div>
        </div>

        <div className='bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col items-center justify-center gap-4'>
          {webcamEnabled ? (
            <div className='w-full rounded-lg overflow-hidden border-2 border-indigo-400'>
               <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '4/3',
                }}
              />
            </div>
          ) : (
            <>
              <div className='w-full aspect-video bg-slate-100 rounded-lg border-2 border-dashed flex items-center justify-center'>
                <WebcamIcon className='h-24 w-24 text-grey-800' />
              </div>
              <button
                className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2'
                onClick={() => setWebcamEnabled(true)}
              >
                <Mic className='h-5 w-5' /> Enable Webcam and Microphone
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className='w-full flex justify-end mt-8 max-w-5xl'>
        <button className='bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 disabled:bg-gray-400'
          disabled={!webcamEnabled}
        >
            <Play className='h-5 w-5' /> Start Interview
        </button>
      </div>
    </div>
  );
}
export default Interview;  
Interview