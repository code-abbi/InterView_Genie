import { Lightbulb, Volume2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const textToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      const speech = new SpeechSynthesisUtterance(text);
      speech.onstart = () => setIsSpeaking(true);
      speech.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support text to speech.');
    }
  };

  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };
  }, [activeQuestionIndex]);
  
  // Loading Skeleton UI with headings
  if (!mockInterviewQuestion || mockInterviewQuestion.length === 0) {
    return (
      <div className='p-5 border rounded-lg my-10 animate-pulse'>
        <div className='h-8 w-1/2 bg-gray-200 rounded-lg mb-6'></div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className='h-8 w-full bg-gray-200 rounded-full'></div>
          ))}
        </div>
        <div className='mt-8'>
            <div className='h-4 w-1/4 bg-gray-200 rounded-lg mb-4'></div>
            <div className='h-5 w-full bg-gray-200 rounded-lg'></div>
            <div className='h-5 w-3/4 bg-gray-200 rounded-lg mt-3'></div>
        </div>
        <div className='mt-12 p-5 border rounded-lg bg-gray-100'>
            <div className='h-5 w-1/4 bg-gray-200 rounded-lg'></div>
            <div className='h-4 w-full bg-gray-200 rounded-lg mt-4'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center font-semibold transition-all duration-300 ease-in-out ${
              activeQuestionIndex === index
                ? 'bg-orange-500 text-white shadow-lg'
                : 'bg-orange-50 text-orange-400'
            }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <div key={activeQuestionIndex} className='my-8 animate-fadeIn'>
        <h3 className='text-sm font-semibold text-orange-600 mb-2'>
            {`Question ${activeQuestionIndex + 1} of ${mockInterviewQuestion.length}`}
        </h3>
        <p className='text-lg font-medium text-gray-800'>
          {mockInterviewQuestion[activeQuestionIndex]?.question}
        </p>
      </div>

      <Volume2
        className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-110 ${
          isSpeaking 
            ? 'text-orange-500 scale-110 animate-pulse' 
            : 'text-gray-500'
        }`}
        onClick={() =>
          textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)
        }
      />

      <div className='border rounded-lg p-5 bg-orange-50 mt-12'>
        <h2 className='flex gap-2 items-center text-orange-600'>
          <Lightbulb className='text-orange-500' />
          <strong className='font-semibold'>Note:</strong>
        </h2>
        <p className='text-sm text-orange-700 my-2'>
            Please note that once an answer is recorded, it cannot be re-recorded for that question.
            Click on Record Answer when you’re ready to respond. If there’s no activity for a few seconds,
             the camera and microphone will automatically turn off, and you may restart when ready.         </p>
      </div>
    </div>
  );
}

export default QuestionSection;