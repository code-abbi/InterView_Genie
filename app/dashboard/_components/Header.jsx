"use client";
import React from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// --- Icon Components ---
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

   const navItems = [
     { href: '/dashboard', label: 'Dashboard', icon: HomeIcon },
     { href: '/dashboard/question', label: 'Question', icon: HelpCircleIcon },
     { href: '/dashboard/upgrade', label: 'Upgrade', icon: RocketIcon },
     { href: '/dashboard/how', label: 'How?', icon: InfoIcon },
   ];

   return (
     <header className='sticky top-0 z-50 bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg border-b border-white/20 dark:border-white/10'> 
       <div className="container mx-auto flex items-center justify-between p-4 h-16">
         {/* Logo and Branding */}
         <Link href="/" className='flex items-center gap-2'>
           <Image src={'/logo.svg'} width={40} height={40} alt='logo' />
           <h1 className="text-2xl font-bold text-gray-800 dark:text-white hidden sm:block">
             InterView<span className="text-orange-500">Genie</span>
           </h1>
         </Link>
         
         {/* Desktop Navigation (Visible on medium screens and up) */}
         <nav className='hidden md:flex items-center gap-2'>
           {navItems.map((item) => (
             <Link key={item.href} href={item.href}>
               <div
                 className={`flex items-center gap-1 p-3 px-2 rounded-lg transition-all cursor-pointer hover:bg-green-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300
                   ${path === item.href ? 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400 font-semibold' : ''}`}
               >
                 {item.icon({ className: "h-5 w-5" })}
                 {item.label}
               </div>
             </Link>
           ))}
         </nav>

         {/* Mobile Navigation (Visible on small screens) */}
         <nav className='md:hidden flex items-center gap-4'>
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = path === item.href;
                return (
                    <Link key={item.href} href={item.href}>
                        <div className={`transition-colors ${isActive ? 'text-orange-500' : 'text-gray-500 hover:text-orange-500'}`}>
                            <Icon className="h-6 w-6" />
                        </div>
                    </Link>
                );
            })}
         </nav>
         
         {/* User Controls */}
         <div className="flex items-center gap-2">
           
             <UserButton afterSignOutUrl="/"/>
         </div>
       </div>
     </header>
   );
}

export default Header;