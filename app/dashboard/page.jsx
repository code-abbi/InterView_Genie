"use client"
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import AddNewInterview from './_components/AddNewInterview';
import { Button } from '@/components/ui/button';
import { Briefcase, Clock, Plus, BarChart } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview, UserAnswer } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import InterviewItemCard from './_components/InterviewItemCard';
import { motion } from 'framer-motion'; // Import framer-motion for animations

const StatsCard = ({ icon: Icon, title, value, note }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
    <div>
      <div className="p-3 bg-orange-100 rounded-lg w-fit">
        <Icon className="h-6 w-6 text-orange-500" />
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-bold text-gray-800 mt-4">{value}</h3>
      <p className="text-gray-500 text-sm">{title}</p>
      {note && <p className="text-gray-400 text-xs mt-1">{note}</p>}
    </div>
  </div>
);

function Dashboard() {
  const { user } = useUser();
  const [openDialog, setOpenDialog] = useState(false);
  const [interviewList, setInterviewList] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.primaryEmailAddress?.emailAddress) {
        setLoading(true);
        // Fetch all interviews
        const interviews = await db.select()
          .from(MockInterview)
          .where(eq(MockInterview.createdBy, user.primaryEmailAddress.emailAddress))
          .orderBy(desc(MockInterview.id));
        setInterviewList(interviews);

        // Fetch all answers and calculate average rating
        if (interviews.length > 0) {
          const userAnswers = await db.select()
            .from(UserAnswer)
            .where(eq(UserAnswer.userEmail, user.primaryEmailAddress.emailAddress));
          
          if (userAnswers.length > 0) {
            const totalRating = userAnswers.reduce((sum, ans) => sum + Number(ans.rating), 0);
            const average = totalRating / userAnswers.length;
            setAvgRating(average.toFixed(1));
          }
        }
        setLoading(false);
      }
    };
    fetchUserData();
  }, [user]);

  // Animation variants for the container and list items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Each child will animate 0.1s after the previous one
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
      },
    },
  };

  return (
    <div className='p-4 sm:p-6 md:p-10'>
      <h2 className='font-bold text-3xl md:text-4xl text-gray-800'>
        Welcome, {user?.firstName}!
      </h2>
      <p className='text-gray-500'>Here's a summary of your interview preparations.</p>

      {/* Conditional Stats/Welcome Section */}
      {loading ? (
        // Skeleton Loader while fetching data
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
          <div className="bg-gray-200 h-40 rounded-2xl animate-pulse"></div>
          <div className="bg-gray-200 h-40 rounded-2xl animate-pulse"></div>
          <div className="bg-gray-200 h-40 rounded-2xl animate-pulse"></div>
        </div>
      ) : interviewList.length > 0 ? (
        // Display Stats for existing users
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8'>
          <StatsCard 
            icon={Briefcase} 
            title="Total Interviews" 
            value={interviewList.length}
            note="All interviews you have created."
          />
          <StatsCard 
            icon={BarChart} 
            title="Avg. Score" 
            value={`${avgRating} / 10`}
            note="Average score across all attempts."
          />
          <StatsCard 
            icon={Clock} 
            title="Keep Practicing" 
            value={"Go!"}
            note="Consistency is key to success."
          />
        </div>
      ) : (
        // Welcome message for new users
        <div className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100 my-8 text-center'>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Start Your Journey</h3>
          <p className="text-gray-500 max-w-2xl mx-auto mb-6">
            Your performance statistics will appear here once you've completed your first mock interview. Create a new session to begin.
          </p>
          
        </div>
      )}

      {/* Add New Interview Dialog (always available) */}
      <AddNewInterview openDialog={openDialog} setOpenDialog={setOpenDialog} />
      
      {/* Recent Interviews List */}
      <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-800">Past Interview</h3>
          <Button
            onClick={() => setOpenDialog(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white shadow-sm hover:shadow-md transition-all rounded-full px-6 py-2 text-base flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add New Interview
          </Button>
          </div>        
        
        {/* Animated Interview List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-3'
        >
          {interviewList.length > 0 ? (
            interviewList.map((interview, index) => (
              <motion.div
                key={interview.mockId || index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.2 } }}
              >
                <InterviewItemCard interview={interview} />
              </motion.div>
            ))
          ) : (
            !loading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-gray-500 col-span-full text-center py-16 bg-gray-50 rounded-lg"
              >
                <h3 className="text-xl font-semibold">No interviews yet!</h3>
                <p>Click 'Add New Interview' to create your first mock interview.</p>
              </motion.div>
            )
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard;
