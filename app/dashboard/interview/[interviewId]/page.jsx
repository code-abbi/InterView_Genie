"use client"
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { WebcamIcon } from 'lucide-react'
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
    <div className='my-10 flex justify-center flex-col items-center'>
     <h2 className='font-bold text-2xl mb-4'>
      let's start the interview 
     </h2>
     <div className='grid grid-cols-1 md:grid-cols-2 gap- mb-4'>

    {/* job information */}
<div className='flex flex-col my-5 gap-5 '>
  <div className='flex flex-col gap-5 p-5 rounded-2xl border '>
  {interviewData ? (
    <>
      <h2 className='text-lg mb-2 gap-5'>
        <strong> Job Role\Job position:</strong> {interviewData.jobPosition}
      </h2>
      <h2 className='text-lg mb-2'>
        <strong> Job Description:</strong> {interviewData.jobDesc}
      </h2>
      <h2 className='text-lg mb-2'>
        <strong> Years of Experience:</strong> {interviewData.jobExperience}
      </h2>
    </>
  ) : (
    <div>Loading interview details...</div>
  )}
  </div>
</div>

{/* webcam information */}
 <div>
       { webcamEnabled? <Webcam 
       onUserMedia={() => setWebcamEnabled(true)}
        onUserMediaError={() => setWebcamEnabled(false)}
    
         style={{ width: 300, height: 300 }}
       /> 
        : 
        <>
        <WebcamIcon className='w-full h-72 p-20 bg-secondary rounded-lg border-2 mb-4' />
        <button 
          className='bg-primary text-white px-4 py-2 rounded-lg'
          onClick={() => setWebcamEnabled(!webcamEnabled)} >
            Enable Webcam and Microphone
          </button>
        </>
       }
     </div>

     </div>
    </div>
  )
}

export default Interview