import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Briefcase, Calendar, Clock, Play, FileText } from 'lucide-react'

function InterviewItemCard({ interview }) {
  const router = useRouter();

  const onStart = () => {
    router.push('/dashboard/interview/' + interview?.mockId)
  }
  const onFeedbackPress = () => {
    router.push('/dashboard/interview/' + interview.mockId + '/feedback')
  }

  return (
    // CHANGE: Replaced background with glass-effect and adjusted styles for readability.
    <div className='glass-effect group flex flex-col justify-between p-4 rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'>
      <div>
        {/* Card Header with Job Position */}
        <div className='flex items-center gap-3 mb-3'>
          <div className='p-2 bg-orange-500/10 rounded-md'>
            <Briefcase className='h-5 w-5 text-orange-500' />
          </div>
          <h2 className='font-bold text-lg text-slate-900 dark:text-slate-100 truncate'>{interview?.jobPosition}</h2>
        </div>
        
        {/* Card Body with details */}
        <div className='space-y-2 text-sm text-slate-600 dark:text-slate-400'>
          <div className='flex items-center gap-2'>
            <Clock className='h-4 w-4' />
            <span>Years of Experience: {interview?.jobExperience} </span>
          </div>
          <div className='flex items-center gap-2'>
            <Calendar className='h-4 w-4' />
            <span>Created At: {interview?.createdAt}</span>
          </div>
        </div>
      </div>
      
      {/* Card Footer with action buttons */}
      <div className='flex justify-between items-center mt-4 pt-4 border-t border-white/20 dark:border-white/10'>
        <Button 
          size='sm' 
          variant='outline' 
          className='bg-white/30 dark:bg-slate-800/30 border-orange-300/50 text-orange-600 dark:text-orange-400 hover:bg-white/50 dark:hover:bg-slate-800/50 flex items-center gap-2'
          onClick={onFeedbackPress}
        >
          <FileText className='h-4 w-4' />
          Feedback
        </Button>
        <Button 
          size='sm' 
          className='bg-green-500 hover:bg-green-600 text-white flex items-center gap-2'
          onClick={onStart}
        >
          <Play className='h-4 w-4' />
          Start
        </Button>
      </div>
    </div>
  )
}

export default InterviewItemCard