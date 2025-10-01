"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import Link from 'next/link';
import { Lightbulb, Mic, Briefcase, Code, Star, Video } from 'lucide-react'
import React, { useEffect, useState, use } from 'react'
import Webcam from 'react-webcam'
import { Button } from '@/components/ui/button'


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
      <h2 className='text-slate-600 dark:text-slate-400 mt-2 text-center'>
        Get ready to ace your interview. Enable your camera and mic to begin.
      </h2>

      <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl'>
        {/* Left Column: Details & Information */}
        <div className='flex flex-col gap-8'>
          {/* Interview Details Card - CHANGED TO GLASS EFFECT */}
          <div className='glass-effect p-6 rounded-2xl shadow-lg flex flex-col gap-5'>
            <h3 className='text-xl font-bold text-slate-900 dark:text-slate-100'>Your Mock Interview Details</h3>
            {interviewData ? (
              <>
                <div className='flex items-center gap-3'>
                  <Briefcase className='h-8 w-8 text-orange-500 p-1 bg-orange-500/10 rounded-md' />
                  <div>
                    <h4 className='text-sm font-medium text-slate-600 dark:text-slate-400'>Job Position</h4>
                    <p className='text-lg font-semibold text-slate-800 dark:text-slate-200'>{interviewData.jobPosition}</p>
                  </div>
                </div>
                <div className='flex items-start gap-3'>
                  <Code className='h-8 w-8 text-orange-500 p-1 bg-orange-500/10 rounded-md flex-shrink-0' />
                  <div>
                    <h4 className='text-sm font-medium text-slate-600 dark:text-slate-400'>Skills & Technologies</h4>
                    <p className='text-lg font-semibold text-slate-800 dark:text-slate-200'>{interviewData.jobDesc}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Star className='h-8 w-8 text-orange-500 p-1 bg-orange-500/10 rounded-md' />
                  <div>
                    <h4 className='text-sm font-medium text-slate-600 dark:text-slate-400'>Years of Experience</h4>
                    <p className='text-lg font-semibold text-slate-800 dark:text-slate-200'>{interviewData.jobExperience}</p>
                  </div>
                </div>
              </>
            ) : (
              // Skeleton Loader
              <div className='flex flex-col gap-5'>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 bg-slate-300/50 rounded-md animate-pulse'></div>
                  <div className='flex-1'><div className='h-10 bg-slate-300/50 rounded animate-pulse'></div></div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 bg-slate-300/50 rounded-md animate-pulse'></div>
                  <div className='flex-1'><div className='h-10 bg-slate-300/50 rounded animate-pulse'></div></div>
                </div>
                <div className='flex items-center gap-3'>
                  <div className='h-10 w-10 bg-slate-300/50 rounded-md animate-pulse'></div>
                  <div className='flex-1'><div className='h-10 bg-slate-300/50 rounded animate-pulse'></div></div>
                </div>
              </div>
            )}
          </div>

          {/* Information Box - CHANGED TO GLASS EFFECT */}
          <div className='p-5 border-l-4 border-orange-400 bg-orange-500/10 rounded-lg'>
            <h2 className='flex gap-2 items-center text-orange-700 dark:text-orange-400 font-semibold'>
              <Lightbulb />
              Important Information
            </h2>
            <p className='mt-2 text-orange-800 dark:text-orange-300 text-sm'>
              {process.env.NEXT_PUBLIC_INFORMATION || "Ensure you are in a quiet, well-lit room for the best experience. The AI will analyze your responses and provide feedback based on your answers and communication skills."}
            </p>
          </div>
        </div>

        {/* Right Column: Webcam - CHANGED TO GLASS EFFECT */}
        <div className='flex flex-col items-center justify-center gap-4 glass-effect p-6 rounded-2xl shadow-lg'>
          {webcamEnabled ? (
            <div className='w-full rounded-lg overflow-hidden ring-4 ring-green-500 ring-offset-2 ring-offset-transparent transition-all'>
              <Webcam
                onUserMedia={() => setWebcamEnabled(true)}
                onUserMediaError={() => setWebcamEnabled(false)}
                mirrored={true}
                className='w-full h-auto aspect-video'
              />
            </div>
          ) : (
            <>
              <div className='w-full aspect-video bg-slate-900/50 rounded-lg border-2 border-dashed border-slate-400/50 flex flex-col items-center justify-center text-slate-500 dark:text-slate-400'>
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
                ? 'bg-gray-400/80 text-gray-100 cursor-not-allowed' 
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
