"use client";
import { Button } from '@/components/ui/button';
import { ArrowRight, BrainCircuit, Mic, Award, Star, TrendingUp, MessageCircle, Code, FileText, Building2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useUser, UserButton } from '@clerk/nextjs';

// Feature Card Component - now with glass effect
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="glass-effect p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition-all duration-300">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-500/20 mb-4">
      <Icon className="h-6 w-6 text-orange-500" />
    </div>
    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-slate-300">{description}</p>
  </div>
);

// Testimonial Card Component - now with glass effect
const TestimonialCard = ({ quote, name, role }) => (
    <div className="flex-shrink-0 w-full sm:w-[45%] lg:w-[30%] snap-start glass-effect p-6 rounded-2xl shadow-lg">
        <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-orange-400 fill-current" />)}
        </div>
        <p className="text-slate-600 dark:text-slate-300 italic mb-4 h-24">"{quote}"</p>
        <div className="mt-auto">
            <p className="font-bold text-slate-800 dark:text-white">{name}</p>
            <p className="text-sm text-orange-500">{role}</p>
        </div>
    </div>
);


export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();

  const companies = [
    "Google", "Amazon", "Microsoft", "Meta", "Netflix", "Salesforce",
    "Adobe", "Intel", "Accenture", "Apple", "Deloitte", "Goldman Sachs"
  ];

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-slate-800 dark:text-slate-200 bg-gradient-to-br from-foreground ">
      {/* Header */}
      <header className="sticky top-0 z-50 p-4 flex justify-between items-center border-b glass-effect">
        <Link href={isSignedIn ? "/dashboard" : "/"} className='flex items-center gap-2 cursor-pointer'>
          <Image src={'/logo.svg'} width={40} height={40} alt='logo' />
          <h1 className="text-2xl font-bold hidden sm:block">
          <span className="text-white">InterView</span> <span className="text-orange-500">Genie</span>
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton afterSignOutUrl='/' />
          ) : (
            <Link href="/dashboard">
              <Button className="bg-orange-500 hover:bg-green-600 text-white rounded-full">Get Started</Button>
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section text-center py-20 px-6">
          <div className="hero-bg-graphics">
              <div className="hero-head"></div>
              <div className="hero-mic"></div>
          </div>
          
          <div className="max-w-4xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Land Your <span className="text-green-500 dream-text-glow">Dream Job</span>, Faster
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-300 dark:text-slate-300">
             Our AI coach analyzes your answers, pinpoints your weaknesses, and gives you tailored feedback to turn interviews into job offers.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-violet-400 text-white font-bold text-lg py-3 px-8 rounded-full transition-transform transform hover:scale-105"
                >
                  Start Practicing Now 
                </Button>
              </Link>  
            </div>
          </div>
        </section>

        {/* Companies Logo Section */}
        <section className="py-12 ">
            <div className="max-w-6xl mx-auto text-center">
                <h3 className="text-sm font-semibold text-black dark:text-slate-400 uppercase tracking-wider mb-8">
                    Our users have landed jobs at
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 items-center">
                    {companies.map((company) => (
                        <div key={company} className="flex items-center justify-center grayscale opacity-60 hover:opacity-100 hover:grayscale-0 transition-all">
                            <span className="text-xl font-bold text-slate-200 dark:text-slate-300">{company}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Personal Growth Section */}
        <section className="py-20 px-6 ">
            <div className="max-w-5xl mx-auto text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">From Nervous to Confident.</h3>
                <p className="text-lg text-slate-300 dark:text-slate-300 mb-12">Our users see measurable improvements after just a few sessions.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl shadow-lg glass-effect">
                        <TrendingUp className="h-12 w-12 mx-auto text-green-500" />
                        <p className="text-5xl font-bold text-green-500 mt-4">75%</p>
                        <p className="text-slate-200 dark:text-slate-200 mt-2">Confidence Boost</p>
                    </div>
                    <div className="p-8 rounded-2xl shadow-lg glass-effect">
                        <MessageCircle className="h-12 w-12 mx-auto text-blue-500" />
                        <p className="text-5xl font-bold text-blue-500 mt-4">85%</p>
                        <p className="text-slate-200 dark:text-slate-300 mt-2">Improved Response Clarity</p>
                    </div>
                    <div className="p-8 rounded-2xl shadow-lg glass-effect">
                        <Code className="h-12 w-12 mx-auto text-purple-500" />
                        <p className="text-5xl font-bold text-purple-500 mt-4">90%</p>
                        <p className="text-slate-200 dark:text-slate-300 mt-2">Higher Technical Accuracy</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 ">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-orange-500">Your Unfair Advantage.</h3>
              <p className="mt-4 text-lg text-slate-300 dark:text-slate-300">Everything you need to prepare, practice, and succeed.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard icon={BrainCircuit} title="AI-Generated Questions" description="Get interview questions tailored to the specific job role, description, and your experience level." />
              <FeatureCard icon={Mic} title="Realistic Practice" description="Use your webcam and microphone to simulate a real interview experience and practice your delivery." />
              <FeatureCard icon={Star} title="Instant AI Feedback" description="Receive immediate, detailed feedback on your answers, including a performance rating and tips for improvement." />
              <FeatureCard icon={Award} title="Track Your Progress" description="Review all your past interviews and feedback to see how you've improved over time on your personal dashboard." />
              <FeatureCard icon={FileText} title="Resume Analysis" description="Upload your resume and our AI will suggest potential questions based on your projects and experience." />
              <FeatureCard icon={Building2} title="Industry Scenarios" description="Practice with situational questions curated from top companies in your field, from startups to FAANG." />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id='how' className="py-20 px-6 ">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-orange-500 mb-12">How It Works in 3 Simple Steps</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500 font-bold text-2xl mb-4">1</div>
                <h4 className="text-xl font-semibold mb-2">Create Interview</h4>
                <p className="text-slate-300 dark:text-slate-300">Input your job details and let our AI generate relevant questions.</p>
              </div>
              <div className="hidden md:block text-2xl text-slate-300 dark:text-slate-600">→</div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-500 font-bold text-2xl mb-4">2</div>
                <h4 className="text-xl font-semibold mb-2">Record Answers</h4>
                <p className="text-slate-300 dark:text-slate-300">Start the session, enable your camera, and record your responses.</p>
              </div>
              <div className="hidden md:block text-2xl text-slate-300 dark:text-slate-600">→</div>
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-violet-100 text-violet-500 font-bold text-2xl mb-4">3</div>
                <h4 className="text-xl font-semibold mb-2">Get Feedback</h4>
                <p className="text-slate-300 dark:text-slate-300">Receive an instant, detailed report on your performance to improve.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Customer Stories Section */}
        <section className="py-20 px-6 ">
            <div className="max-w-6xl mx-auto text-center">
                <h3 className="text-3xl md:text-4xl font-bold text-green-500 mb-4">Don't Just Take Our Word For It.</h3>
                <p className="text-lg text-slate-500 dark:text-slate-400 mb-12">Scroll to see more success stories →</p>
                <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory">
                    <TestimonialCard quote="InterViewGenie was a game-changer. The AI feedback was brutally honest but incredibly helpful. I nailed the final round and landed my dream job!" name="Priya Sharma" role="Software Engineer at FinTech Solutions" />
                    <TestimonialCard quote="As someone new to the industry, I was terrified of technical interviews. This platform gave me the practice and confidence I needed to succeed." name="Rohan Verma" role="Data Scientist at AnalyzeMe" />
                    <TestimonialCard quote="This isn't just for engineers! I used it to prepare for my product management interviews. The situational questions were very realistic." name="Anjali Desai" role="Product Manager at Innovate Hub" />
                    <TestimonialCard quote="The ability to practice questions related to my specific tech stack (AWS, Kubernetes) was invaluable. I could talk through my entire thought process and get feedback." name="Vikram Singh" role="DevOps Engineer at CloudNet" />
                    <TestimonialCard quote="As a recent graduate, I had no real interview experience. This platform was my personal coach. I practiced daily and landed a job in my first-ever interview." name="Sneha Gupta" role="Associate Developer at a Startup" />
                </div>
            </div>
        </section>

        {/* Platform Growth Section */}
        <section className="py-24 px-6 ">
          <div className="container mx-auto text-center">
            <h3 className="text-4xl md:text-5xl text-orange-400 font-bold mb-16">Join Our Growing Community</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              <div className="text-center">
                <p className="text-5xl md:text-6xl font-bold text-orange-400 mb-2">150,000+</p>
                <p className="text-orange-200 text-lg">Interviews Taken</p>
              </div>
              <ArrowRight className="h-8 w-8 text-primary/60 hidden md:block" />
              <div className="text-center">
                <p className="text-5xl md:text-6xl font-bold text-green-400 mb-2">50,000+</p>
                <p className="text-green-200 text-lg">Users Helped</p>
              </div>
              <ArrowRight className="h-8 w-8 text-green-200 hidden md:block" />
              <div className="text-center">
                <p className="text-5xl md:text-6xl font-bold text-violet-400 mb-2">95%</p>
                <p className="text-violet-200 text-lg">Reported Higher Confidence</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Final CTA */}
        <section className="text-center py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">Ready to Land Your Dream Job?</h3>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Stop guessing. Start preparing. Your next interview could be the one that changes everything.
            </p>
            <div className="mt-8">
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  className="bg-orange-500 hover:bg-green-600 text-white font-bold text-lg py-3 px-8 rounded-full transition-transform transform hover:scale-105"
                >
                  Start For Free
                </Button>
              </Link>
               <p className="mt-6 text-sm text-muted-foreground">
              Join 50,000+ professionals who turned interviews into offers.
            </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
     <footer className="border-t glass-effect py-10 px-6 text-center">
        <div className="container mx-auto">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} InterViewGenie All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}