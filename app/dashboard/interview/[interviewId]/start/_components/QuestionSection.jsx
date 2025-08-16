import React from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {
  return (
    <div className='p-5 border rounded-lg'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {mockInterviewQuestion.length > 0 ? (
                mockInterviewQuestion.map((question, index) => (
                    <div key={index} className='cursor-pointer' onClick={() => onQuestionClick(index)}>
                         <div 
                             className={`p-2 rounded-full text-center text-xs font-bold ${index === activeQuestionIndex ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                         >
                             Question #{index + 1}
                         </div>
                    </div>
                ))
            ) : (
                <div>No questions found.</div>
            )}
        </div>
    </div>
  );
}

export default QuestionSection;