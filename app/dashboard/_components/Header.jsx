// File: app/dashboard/_components/Header.jsx

"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

// --- Helper Icon Components ---
// For a cleaner project structure, you could move these to their own file (e.g., 'icons.js')
const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const HelpCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

const RocketIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.33-.04-3.08s-2.24-.75-3.08-.04z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
);

const InfoIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 16v-4" />
        <path d="M12 8h.01" />
    </svg>
);


function Header() {
   const path = usePathname();

   // This effect is not strictly necessary for functionality but is kept as it was in the original code.
   useEffect(() => {
     console.log("Current Path:", path);
   }, [path]);

   // Navigation items array for easier mapping
   const navItems = [
     { href: '/dashboard', label: 'Dashboard', icon: <HomeIcon className="h-5 w-5" /> },
     { href: '/dashboard/question', label: 'Question', icon: <HelpCircleIcon className="h-5 w-5" /> },
     { href: '/dashboard/upgrade', label: 'Upgrade', icon: <RocketIcon className="h-5 w-5" /> },
     { href: '/dashboard/how', label: 'How?', icon: <InfoIcon className="h-5 w-5" /> },
   ];

   return (
     <header className='sticky top-0 z-50 bg-white shadow-md border-b border-gray-200'> 
       <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo and Branding */}
        <Link href="/" className='flex items-center gap-2'>
          <Image src={'/logo.svg'} width={40} height={40} alt='logo' />
          <h1 className="text-2xl font-bold text-gray-800 hidden sm:block">
            InterView<span className="text-orange-500">Genie</span>
          </h1>
        </Link>
        
        {/* Navigation Links */}
        <nav className='hidden md:flex items-center gap-2'>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-2 p-3 px-4 rounded-lg transition-all cursor-pointer hover:bg-green-100 text-gray-600
                  ${path === item.href ? 'bg-orange-100 text-orange-600 font-semibold' : ''}`}
              >
                {item.icon}
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
        
        {/* User Button */}
        <div className="flex items-center">
            <UserButton afterSignOutUrl="/"/>
        </div>
       </div>
     </header>
   );
}

export default Header;
