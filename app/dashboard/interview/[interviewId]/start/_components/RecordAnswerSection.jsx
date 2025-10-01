"use client";
import Webcam from 'react-webcam';
import React, { useEffect, useState } from 'react';
import { WebcamIcon, Mic, Square } from 'lucide-react'; // Import Square for the stop button
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAIModal';
import { useUser } from '@clerk/nextjs';
import dayjs from 'dayjs';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';

function RecordAnswerSection({ webcamEnabled, setWebcamEnabled, mockInterviewQuestion, activeQuestionIndex,interviewData,onAnswerSubmitted}) {
    const[userAnswer, setUserAnswer] = useState('');
    const{user}=useUser();
    const[loading, setLoading] = useState(false);
    const [isBrowserSupported, setIsBrowserSupported] = useState(true);

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
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setIsBrowserSupported(false);
        }
    }, []);
   useEffect(() => {
        if (results.length > 0) {
            const latestTranscript = results.map(r => r.transcript).join(' ');
            setUserAnswer(latestTranscript);
        }
    }, [results]);

    useEffect(() => {
    if (!isRecording) {
        setWebcamEnabled(false);

        // Then, check if there's a valid answer to save.
        if (userAnswer?.length > 10 && !loading) {
            UpdateUserAnswer();
        }
    }
        }, [isRecording]);

    const StartStopRecording = async () => {
    if (isRecording) {
        stopSpeechToText();
    } else {
        setWebcamEnabled(true); // Only enable when starting a new recording
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
          correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer||null,
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
          onAnswerSubmitted(); // Signal to the parent component to move to the next question
               }
               setResults([]);
    setLoading(false);
   }
   return (
    // CHANGE: Applied glass effect to the main container
    <div className='glass-effect flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg'>
      {/* CHANGE: Removed the border and let the glass effect handle the container */}
      <div className='w-full rounded-lg overflow-hidden'>
        {webcamEnabled ? ( 
          <Webcam
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            mirrored={true}
            className='w-full h-auto aspect-video'
          />
        ) : ( 
          // CHANGE: Updated placeholder to have a semi-transparent background
          <div className='w-full aspect-video bg-slate-900/50 rounded-lg flex items-center justify-center'>
            <WebcamIcon className='h-48 w-48 text-orange-500/50' />
          </div>
        )}
      </div>
      
      {/* CHANGE: Updated button styles for recording and stopping states */}
      <button 
        disabled={loading}
        className={`w-full font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 text-white
          ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
        onClick={StartStopRecording} 
      >
        {isRecording ? (
          <> 
            <Square className='h-5 w-5 animate-pulse' />
            Stop Recording...
          </>
        ) : (
          <>
            <Mic className='h-5 w-5' />
            Record Answer
          </>
        )}
      </button>

      {error && <p className='text-red-500 text-sm mt-2'>Error: 
        Speech recognition is not available in your browser. For the best experience, please use Google Chrome.
       </p>}
    </div>
   )
  }
export default RecordAnswerSection;
