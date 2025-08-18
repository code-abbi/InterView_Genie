"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link';
import { Lightbulb, WebcamIcon, Mic, Briefcase, Code, Star, Video } from 'lucide-react'
import React, { useEffect, useState, use } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button' // Assuming you have a Button component from shadcn/ui


function Interview(props) {
  const unwrappedParams = use(props.params);
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (unwrappedParams?.interviewId) {
        const result = await db.select().from(MockInterview)
          .where(eq(MockInterview.mockId, unwrappedParams.interviewId));
        setInterviewData(result[0]);
      }
    };
    fetchData();
  }, [unwrappedParams.interviewId]);

  return (
    <div className='my-10 flex flex-col items-center justify-center p-4'>
      <h1 className='text-4xl font-bold text-orange-500 text-center'>
        Interview Preparation
      </h1>
      <h2 className='text-gray-500 mt-2 text-center'>
        Get ready to ace your interview. Enable your camera and mic to begin.
      </h2>

      <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl'>
        {/* Left Column: Details & Information */}
        <div className='flex flex-col gap-8'>
          {/* Interview Details Card */}
          <div className='bg-white p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col gap-5 transition-all hover:shadow-xl'>
            <h3 className='text-xl font-bold text-gray-800'>Your Mock Interview Details</h3>
            {interviewData ? (
              <>
                <div className='flex items-center gap-3'>
                  <Briefcase className='h-8 w-8 text-orange-500 p-1 bg-orange-100 rounded-md' />
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Job Position</h4>
                    <p className='text-lg font-semibold text-gray-700'>{interviewData.jobPosition}</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Code className='h-8 w-8 text-orange-500 p-1 bg-orange-100 rounded-md flex-shrink-0' />
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Skills & Technologies</h4>
                    <p className='text-lg font-semibold text-gray-700'>{interviewData.jobDesc}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Star className='h-8 w-8 text-orange-500 p-1 bg-orange-100 rounded-md' />
                  <div>
                    <h4 className='text-sm font-medium text-gray-500'>Years of Experience</h4>
                    <p className='text-lg font-semibold text-gray-700'>{interviewData.jobExperience}</p>
                  </div>
                </div>
              </>
            ) : (
              // Skeleton Loader
              <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 bg-slate-200 rounded-md animate-pulse'></div>
                  <div className='flex-1'><div className='h-10 bg-slate-200 rounded animate-pulse'></div></div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 bg-slate-200 rounded-md animate-pulse'></div>
                  <div className='flex-1'><div className='h-10 bg-slate-200 rounded animate-pulse'></div></div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 bg-slate-200 rounded-md animate-pulse'></div>
                  <div className='flex-1'><div className='h-10 bg-slate-200 rounded animate-pulse'></div></div>
                </div>
              </div>
            )}
          </div>

          {/* Information Box */}
          <div className='p-5 border-l-4 border-orange-400 bg-orange-50 rounded-lg'>
            <h2 className='flex gap-2 items-center text-orange-700 font-semibold'>
              <Lightbulb />
              Important Information
            </h2>
            <p className='mt-2 text-orange-600 text-sm'>
              {process.env.NEXT_PUBLIC_INFORMATION || "Ensure you are in a quiet, well-lit room for the best experience. The AI will analyze your responses and provide feedback based on your answers and communication skills."}
            </p>
          </div>
        </div>

        {/* Right Column: Webcam */}
        <div className='flex flex-col items-center justify-center gap-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-200'>
          {webcamEnabled ? (
            <div className='w-full rounded-lg overflow-hidden ring-4 ring-green-500 ring-offset-2 transition-all'>
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                style={{
                  width: '100%',
                  height: 'auto',
                  aspectRatio: '16/9',
                }}
              />
            </div>
          ) : (
            <>
              <div className='w-full aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500'>
                <Video className='h-24 w-24' />
                <p className='mt-2 font-medium'>Camera is turned off</p>
              </div>
              <Button
                className='w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 text-base transform hover:scale-105 flex items-center justify-center gap-2'
                onClick={() => setWebcamEnabled(true)}
              >
                <Mic className='h-5 w-5' /> Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Action Button */}
      <div className='w-full flex justify-center md:justify-end mt-8 max-w-6xl'>
        <Link href={`/dashboard/interview/${unwrappedParams.interviewId}/start`}>
          <Button 
            className={`py-3 px-8 rounded-lg text-lg font-bold transition-all duration-300 transform flex items-center gap-2
              ${!webcamEnabled 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:shadow-xl hover:scale-105 animate-pulse'
              }`}
            disabled={!webcamEnabled}
          >
            Start Interview
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
