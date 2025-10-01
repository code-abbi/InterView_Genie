"use client";
import React from 'react';
import { ChevronsUpDown, Target, BrainCircuit, Wrench, FolderGit2, Star, CheckCircle } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from '@/components/ui/button';

// Data for the question types to make the component cleaner
const questionTypes = [
  {
    icon: Target,
    title: "Behavioral Questions",
    description: "These questions assess your soft skills and past experiences. The AI will prompt you to share examples of how you have handled challenges, worked with teams, and solved problems in previous roles.",
    example: "Example: 'Tell me about a time you had a conflict with a coworker and how you resolved it.'",
    tip: "Pro Tip: Use the STAR method (Situation, Task, Action, Result) to structure your answers clearly and effectively."
  },
  {
    icon: Wrench,
    title: "Technical Questions",
    description: "These questions test your knowledge of specific technologies, algorithms, and concepts relevant to the job description. Be prepared to explain concepts, compare technologies, and describe your approach to coding challenges.",
    example: "Example: 'Can you explain the difference between REST and GraphQL? When would you choose one over the other?'",
    tip: "Pro Tip: Articulate your thought process out loud. Even if you don't know the final answer, explaining how you would approach the problem is valuable."
  },
  {
    icon: BrainCircuit,
    title: "Situational Questions",
    description: "These questions present hypothetical scenarios to evaluate your problem-solving skills, judgment, and critical thinking. There may not be a single 'right' answer; the focus is on your thought process.",
    example: "Example: 'Imagine you're about to miss a deadline. What steps would you take to handle the situation?'",
    tip: "Pro Tip: Break down the scenario, identify the key issues, and explain the steps you would take, justifying each one."
  },
  {
    icon: FolderGit2,
    title: "Project & Portfolio Questions",
    description: "Expect questions about the projects listed on your resume. The AI will dig into your specific contributions, technical choices, and the challenges you faced. Be ready to discuss your work in detail.",
    example: "Example: 'Looking at your resume, can you walk me through the architecture of the [Project Name] application?'",
    tip: "Pro Tip: Revisit your key projects before the interview. Be prepared to discuss technical details, your role, and what you learned."
  }
];

function QuestionGuide() {
  return (
    <div className=' dark:bg-gray-900 py-12 sm:py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-16'>
          <h2 className='text-4xl sm:text-5xl font-bold text-orange-500'>
            Master Your Interview
          </h2>
          <p className='mt-4 text-lg text-grey-600 dark:text-gray-300 max-w-3xl mx-auto'>
            Our AI simulates a real interview to give you the edge. Here’s a guide to the types of questions you’ll face and how to excel.
          </p>
        </div>

        {/* Main Content Sections */}
        <div className='max-w-3xl mx-auto space-y-12'>
          {/* Question Types Section */}
          <section>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center sm:text-left'>Types of Questions to Expect</h3>
            <div className='space-y-4'>
              {questionTypes.map((q, index) => {
                const Icon = q.icon;
                return (
                  <Collapsible key={index} className="bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-colors duration-300 hover:border-primary hover:shadow-lg">
                    <CollapsibleTrigger className='p-4 flex justify-between items-center gap-4 w-full text-left font-semibold text-lg text-gray-800 dark:text-gray-100'>
                      <div className="flex items-center gap-4">
                        <Icon className="h-6 w-6 text-primary" />
                        {q.title}
                      </div>
                      <ChevronsUpDown className='h-5 w-5 shrink-0 text-gray-500' />
                    </CollapsibleTrigger>
                    <CollapsibleContent className='px-6 pb-6 space-y-4 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95'>
                      <p className='text-gray-600 dark:text-gray-300'>{q.description}</p>
                      <p className='p-3 bg-gray-300 dark:bg-gray-700/50 rounded-md text-gray-700 dark:text-gray-200 text-sm italic'>
                        {q.example}
                      </p>
                      <div className="flex items-start gap-3 pt-2">
                        <Star className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <p className='text-gray-800 dark:text-gray-100 font-medium'>
                          {q.tip}
                        </p>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </div>
          </section>

          {/* Tips for Success Section */}
          <section>
             <div className='p-6 bg-gray-100 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-colors duration-300 hover:border-primary hover:shadow-lg'>
              <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center sm:text-left'>Tips for Success</h3>
              <ul className='space-y-4'>
                <li className='flex items-start gap-3'>
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span className='text-gray-700 dark:text-gray-300'>
                    <strong>Treat it seriously:</strong> Approach the mock interview as if it were the real thing to get the most benefit.
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span className='text-gray-700 dark:text-gray-300'>
                    <strong>Articulate your thoughts:</strong> Speak your thought process out loud, especially for technical questions.
                  </span>
                </li>
                <li className='flex items-start gap-3'>
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span className='text-gray-700 dark:text-gray-300'>
                    <strong>Use the feedback:</strong> Carefully review the AI's feedback after each interview to identify areas for improvement.
                  </span>
                </li>
                 <li className='flex items-start gap-3'>
                  <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                  <span className='text-gray-700 dark:text-gray-300'>
                    <strong>Practice consistently:</strong> Regular practice builds confidence and fluency. Don't just do one and stop!
                  </span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Back to Dashboard Button */}
        <div className='flex justify-center mt-16'>
          <Button size="lg" onClick={() => window.location.href = '/dashboard'}>
            Ready? Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuestionGuide;
