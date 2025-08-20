"use client";
import React from 'react';
import Header from './_components/Header';
import { usePathname } from 'next/navigation';

function DashboardLayout({children}) {
  const pathname = usePathname(); 

  // Logic to identify the preparation and start pages
  const isInterviewPage = pathname.startsWith('/dashboard/interview/');
  const isFeedbackPage = pathname.includes('/feedback');
  
  // Show header unless it's the prep page or the start page
  const showHeader = !isInterviewPage || isFeedbackPage;

  return (
    <div>
        {showHeader && <Header />}
        {/* Add padding-bottom to prevent content from being hidden by the fixed nav bar */}
        <div className={`pb-20 ${showHeader ? 'mx-5 md:mx-20 lg:mx-36' : 'p-5 md:p-10'}`}>
            {children}
        </div>
    </div>
);
}

export default DashboardLayout;