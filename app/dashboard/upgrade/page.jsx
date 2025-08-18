"use client"
import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: 0,
    features: [
      { text: 'Create Free Mock Interviews', included: true },
      { text: 'Unlimited Retake Interview', included: true },
      { text: 'Resume & LinkedIn profile review by a mentor', included: false },
      { text: 'Live mock interview with a human mentor 2 times a week', included: false },
      { text: 'Email support for feedback and technical help', included: false },
    ],
    isCurrent: true,
  },
  {
    name: 'Monthly',
    price: 7.99,
    features: [
      { text: 'Create Free Mock Interviews', included: true },
      { text: 'Unlimited Retake Interview', included: true },
      { text: 'Resume & LinkedIn profile review by a mentor', included: true },
      { text: 'Live mock interview with a human mentor 2 times a week', included: true },
      { text: 'Email support for feedback and technical help', included: true },
    ],
    isPopular: true,
  },
];

function Upgrade() {
  const handleUpgrade = () => {
    window.location.href = 'https://razorpay.com/x/payouts/';
  };

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-900 p-4 sm:p-10'>
      <div className='max-w-5xl mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl sm:text-5xl font-extrabold text-orange-500 dark:text-white'>
            Find the perfect plan
          </h2>
          <p className='mt-4 text-lg text-gray-600 dark:text-gray-300'>
            Unlock your full potential with our premium features.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`
                relative flex flex-col p-8 rounded-2xl border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm 
                transition-all duration-300 hover:shadow-xl hover:-translate-y-1
                ${plan.isPopular ? 'border-2 border-orange-500 shadow-lg' : 'border-gray-200'}
              `}
            >
              {plan.isPopular && (
                <div className='absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2'>
                  <span className='bg-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase'>
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className='flex-grow'>
                <h3 className='text-2xl font-bold text-gray-900 dark:text-white'>{plan.name}</h3>
                <div className='my-5'>
                  <span className='text-5xl font-extrabold text-gray-900 dark:text-white'>
                    ${plan.price}
                  </span>
                  <span className='text-lg font-medium text-gray-500 dark:text-gray-400'>
                    /month
                  </span>
                </div>
                <ul className='space-y-4'>
                  {plan.features.map((feature, index) => (
                    <li key={index} className='flex items-start'>
                      {feature.included ? (
                        <CheckCircle2 className='h-6 w-6 text-green-500 mr-3 flex-shrink-0' />
                      ) : (
                        <XCircle className='h-6 w-6 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0' />
                      )}
                      <span className={feature.included ? 'text-gray-800 dark:text-gray-200' : 'text-gray-500 dark:text-gray-400 line-through'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className='mt-8'>
                {plan.isCurrent ? (
                  <Button variant="outline" className='w-full bg-green-300 text-green-800' disabled>
                    Current Plan
                  </Button>
                ) : (
                  <Button
                    onClick={handleUpgrade}
                    className={`
                      w-full text-lg font-semibold
                      ${plan.isPopular ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-gray-800 hover:bg-gray-900 text-white'}
                    `}
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;