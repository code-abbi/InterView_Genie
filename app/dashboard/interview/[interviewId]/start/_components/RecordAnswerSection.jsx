"use client";
import Webcam from 'react-webcam'; // Correct import for Webcam component
import React, { useEffect, useState } from 'react';
import { WebcamIcon, Mic, User } from 'lucide-react';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { useUser } from '@clerk/nextjs';
import dayjs from 'dayjs';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';

function RecordAnswerSection({ webcamEnabled, setWebcamEnabled, mockInterviewQuestion, activeQuestionIndex,interviewData}) {
    const[userAnswer, setUserAnswer] = useState('');
    const{user}=useUser();
    const[loading, setLoading] = useState(false);
    const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
    } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
    });
   useEffect(() => {
        if (results.length > 0) {
            const latestTranscript = results.map(r => r.transcript).join(' ');
            setUserAnswer(latestTranscript);
        }
    }, [results]);

    useEffect(() => {
      if(!isRecording && userAnswer?.length > 10 &&!loading) {
        UpdateUserAnswer();
      }
    },[isRecording,userAnswer]);

    const StartStopRecording=async()=>{
       setWebcamEnabled(!webcamEnabled); 
    if(isRecording)
      
      stopSpeechToText();
      
    else{
      startSpeechToText();
    }
   }
  
   const UpdateUserAnswer=async()=>{ 
    setLoading(true);
      const feedbackPrompt = `You are a professional and helpful interview AI. Your task is to provide feedback on an interview answer.
           Based on the question: "${mockInterviewQuestion[activeQuestionIndex]?.question}"
           And the user's answer: "${userAnswer}"
           Please provide a rating (from 1 to 10) and feedback for improvement. Your response must be in JSON format only, with no additional text or markdown.

           Example of expected JSON output:
        {
           "rating": 8,
          "feedback": "Your answer was clear and concise, but it lacked specific examples to support your points. Try to include a real-world project example next time."
         }

          Please provide the JSON output now.`;
         const result= await chatSession.sendMessage(feedbackPrompt);

         const mockJsonResp = result.response.text().replace('```json', '').replace('```', '');
         console.log(mockJsonResp)
         const JsonFeedbackResp= JSON.parse(mockJsonResp);

         const resp=await db.insert(UserAnswer).values({
          mockIdref: interviewData?.mockId,
          question: mockInterviewQuestion[activeQuestionIndex]?.question,
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
          userAns:userAnswer, 
          feedback:JsonFeedbackResp?.feedback,
          rating:JsonFeedbackResp?.rating,
          createdAt:dayjs().format('DD-MM-YYYY'),
          userEmail:user?.primaryEmailAddress?.emailAddress
         })

         if(resp){
          toast.success("Your answer has been recorded successfully.");
          setUserAnswer(''); // Clear the answer after saving
          setWebcamEnabled(false); 
          setResults([]);
               }
               setResults([]);
    setLoading(false);
   }
   return (
    <div className='flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-md border border-gray-200'>
      {webcamEnabled ? ( // Display webcam if enabled
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
      ) : ( // Otherwise, display the placeholder icon
        <div className='w-full aspect-video bg-gray-900 rounded-lg border-2 border-dashed flex items-center justify-center'>
          <WebcamIcon className='h-48 w-48 text-orange-600' />
        </div>
      )}
      <button disabled={loading}
        variant="outline"
        className='w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4'
        onClick={StartStopRecording} // Use the new handler
      >
        {isRecording ? (
          <> 
            <Mic className='h-5 w-5' />
            Recording...
          </>
        ) : (
          'Record Answer'
        )}
      </button>
        {/* Display the user's answer */}
        {/* <button onClick={() =>console.log(userAnswer) }>Show Answer</button> */}
      {/* Display transcribed results (for debugging/testing)*/}
      {/* <div className='mt-4 text-gray-700 w-full text-left'>
        {results.map((result) => (
          <span key={result.timestamp}>{result.transcript}</span>
        ))}
      </div>
      {interimResult && <div className='text-gray-500 text-sm mt-1'>Interim: {interimResult}</div>} */}

    </div>
   )
  }
export default RecordAnswerSection;