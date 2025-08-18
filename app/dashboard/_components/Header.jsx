// File: app/dashboard/_components/Header.jsx

"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link' // Import the Link component

function Header() {
   const path = usePathname();
   useEffect(() => {
     console.log(path);
   }, []);

   return (
     <div className='flex p-4 items-center justify-between bg-secondary shadow-sm'> 
       <Image src={'/logo.svg'} width={40} height={20} alt='logo' />
       <ul className='hidden md:flex gap-6'>
         <li
           className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard' ? 'text-primary font-bold' : ''}`}
         >
          <Link href="/dashboard">Dashboard</Link>
         </li>
         <li 
           className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/question' ? 'text-primary font-bold' : ''}`}
         >
           <Link href="/dashboard/question">Question</Link>
         </li>
         <li 
           className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/upgrade' ? 'text-primary font-bold' : ''}`}
         >
           <Link href="/dashboard/upgrade">Upgrade</Link>
         </li>
         <li 
           className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${path === '/dashboard/how' ? 'text-primary font-bold' : ''}`}
         >
           <Link href="/dashboard/how">How?</Link>
         </li>
       </ul>
       <UserButton />
     </div>
   );
}
export default Header;