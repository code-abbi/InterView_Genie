"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Mic, Award, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useUser, UserButton } from '@clerk/nextjs';

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
      <Icon className="h-6 w-6 text-orange-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  // While Clerk is loading, we can show a blank screen or a spinner
  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 p-4 flex justify-between items-center border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 dark:border-slate-800">
        <Link href={isSignedIn ? "/dashboard" : "/"} className='flex items-center gap-2 cursor-pointer'>
          <Image src={'/logo.svg'} width={40} height={40} alt='logo' />
          <h1 className="text-2xl font-bold hidden sm:block">
            InterView<span className="text-orange-500">Genie</span>
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl='/' />
          ) : (
            <>
              <Link href="/dashboard">
                <Button className="bg-orange-500 hover:bg-green-600 text-white rounded-full">Login</Button>
              </Link>
              
            </>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="text-center py-20 px-6 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Ace Your Next Interview
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300">
              Practice with our AI-powered mock interviews, get instant, personalized feedback, and land your dream job. Your personal interview coach is just one click away.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-green-600 text-white font-bold text-lg py-3 px-8 rounded-full transition-transform transform hover:scale-105"
                >
                  Start Practicing Now 
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-orange-500">Why InterViewGenie?</h3>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">Everything you need to prepare and succeed.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={BrainCircuit}
                title="AI-Generated Questions"
                description="Get interview questions tailored to the specific job role, description, and your experience level."
              />
              <FeatureCard 
                icon={Mic}
                title="Realistic Practice"
                description="Use your webcam and microphone to simulate a real interview experience and practice your delivery."
              />
              <FeatureCard 
                icon={Star}
                title="Instant AI Feedback"
                description="Receive immediate, detailed feedback on your answers, including a performance rating and tips for improvement."
              />
              <FeatureCard 
                icon={Award}
                title="Track Your Progress"
                description="Review all your past interviews and feedback to see how you've improved over time on your personal dashboard."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-6 bg-white dark:bg-slate-900">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-orange-500 mb-12">How It Works</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 font-bold text-2xl mb-4">1</div>
                <h4 className="text-xl font-semibold mb-2">Create Interview</h4>
                <p className="text-slate-600 dark:text-slate-300">Input your job details and let our AI generate relevant questions.</p>
              </div>
              <div className="hidden md:block text-2xl text-slate-300 dark:text-slate-600">→</div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 font-bold text-2xl mb-4">2</div>
                <h4 className="text-xl font-semibold mb-2">Record Answers</h4>
                <p className="text-slate-600 dark:text-slate-300">Start the session, enable your camera, and record your responses.</p>
              </div>
              <div className="hidden md:block text-2xl text-slate-300 dark:text-slate-600">→</div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 font-bold text-2xl mb-4">3</div>
                <h4 className="text-xl font-semibold mb-2">Get Feedback</h4>
                <p className="text-slate-600 dark:text-slate-300">Receive an instant, detailed report on your performance to improve.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="text-center py-20 px-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Ready to Land Your Dream Job?</h3>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Stop guessing what interviewers will ask. Start practicing with the tool designed to get you hired.
            </p>
            <div className="mt-8">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-green-600 text-white font-bold text-lg py-3 px-8 rounded-full transition-transform transform hover:scale-105"
                >
                  Start
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-slate-500 border-t bg-white dark:bg-slate-900 dark:border-slate-800">
        <p>&copy; {new Date().getFullYear()} Avi.t. All rights reserved.</p>
      </footer>
    </div>
  );
}