"use client"
import React from 'react';
import { Lightbulb, Mic, WebcamIcon, Play, ChevronsUpDown, Award } from 'lucide-react';

// Array to hold the steps data for easy mapping
const steps = [
  {
    icon: Lightbulb,
    // CHANGE: Updated background colors to be semi-transparent
    bgColor: 'bg-orange-500/10 dark:bg-orange-500/20',
    iconColor: 'text-orange-500',
    title: 'Step 1: Define Your Interview',
    description: "Start by heading to your Dashboard and clicking the '+ New Interview' card. A setup screen will appear where you'll provide the job role you're targeting, a detailed job description, and your years of experience. Our advanced AI uses this information to generate a custom set of interview questions tailored specifically to your career goals and skill level."
  },
  {
    icon: WebcamIcon,
    bgColor: 'bg-sky-500/10 dark:bg-sky-500/20',
    iconColor: 'text-sky-500',
    title: 'Step 2: Prepare Your Setup',
    description: "Once your questions are generated, you'll be directed to the interview preparation page. Before you begin, the system will prompt you to enable and grant access to your webcam and microphone. This is crucial for recording your answers and receiving feedback on your communication skills. Take a moment to ensure you're in a well-lit, quiet environment."
  },
  {
    icon: Play,
    bgColor: 'bg-green-500/10 dark:bg-green-500/20',
    iconColor: 'text-green-500',
    title: 'Step 3: Start the Interview',
    description: "With your setup ready, it's time to begin. Click the 'Start Interview' button to reveal the first question. Read it carefully, compose your thoughts, and when you're ready to answer, press 'Record Answer'. You can take as much time as you need to prepare before recording each response."
  },
  {
    icon: Mic,
    bgColor: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    iconColor: 'text-indigo-500',
    title: 'Step 4: Record & Get Instant Feedback',
    description: "As you speak, our application will capture your answer and transcribe it in real-time. After you finish recording, submit your answer. Our AI will then instantly analyze your response against the job description, providing a star rating, detailed feedback on the content of your answer, and constructive tips for improvement."
  },
  {
    icon: Award,
    bgColor: 'bg-red-500/10 dark:bg-red-500/20',
    iconColor: 'text-red-500',
    title: 'Step 5: Review and Improve',
    description: "After completing all the questions, your journey isn't over. Navigate to the 'Feedback' section from your dashboard to access a comprehensive report of your performance. Here, you can review each question, your transcribed answer, and the AI's detailed feedback to identify your strengths and areas for growth."
  }
];

function HowItWorks() {
  return (
    // CHANGE: Removed background color to let the page gradient show through
    <div className='py-12 sm:py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-extrabold text-orange-500 dark:text-orange-400'>
            How It Works
          </h2>
          <p className='mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto'>
            Follow these simple steps to master your next interview with AI-powered practice and feedback.
          </p>
        </div>

        {/* Timeline Section */}
        <div className='relative'>
          {/* The vertical line - CHANGE: Made it more subtle */}
          <div className='absolute left-9 sm:left-1/2 top-5 h-[calc(100%-2rem)] w-1 bg-slate-300/50 dark:bg-slate-700/50 rounded-full transform -translate-x-1/2'></div>

          <div className='space-y-12'>
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;
              return (
                <div key={index} className='relative flex items-start sm:items-center group'>
                  {/* Icon and Circle */}
                  <div className={`
                    absolute left-9 sm:left-1/2 top-3 sm:top-1/2 
                    w-12 h-12 ${step.bgColor} rounded-full 
                    flex items-center justify-center 
                    transform -translate-x-1/2 -translate-y-1/2 
                    border-4 border-slate-50 dark:border-slate-900/80
                    transition-transform duration-300 group-hover:scale-110
                  `}>
                    <Icon className={`w-6 h-6   ${step.iconColor}`} />
                  </div>

                  {/* Content Card - CHANGE: Applied glass-effect and updated text/border colors */}
                  <div className={` 
                    w-full sm:w-[calc(50%-4rem)] p-6 glass-effect rounded-2xl shadow-lg 
                    transition-all duration-300 hover:shadow-2xl hover:border-orange-400/50
                    ${isEven ? 'sm:ml-auto' : 'sm:mr-auto sm:text-right'}
                    ml-20 sm:ml-0
                  `}>
                    <h3 className='text-xl font-bold text-orange-500 dark:text-orange-400'>{step.title}</h3>
                    <p className='mt-2 text-slate-800 dark:text-slate-200'>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;