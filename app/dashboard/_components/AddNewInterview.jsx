"use client"
import React, { useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
  return (
    <div>
      <div className='p-10 border -lg bg-seconary rounded-md 
      hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>

        <h2 className='text-lg text-center'>
            +Add New Interview
        </h2>
      </div>
      <Dialog open={openDialog}>

  <DialogContent className={'max-w-2xl'}>
    <DialogHeader>
      <DialogTitle className={' text-2xl'}>Tell us more about your job</DialogTitle>
      <DialogDescription>
    <div>
         <h2> Add details about your job position/role, Job description and years of experience </h2>
        <div className='my-3 mt-7'>
            <label className='block mb-2 text-sm  text-gray-900 dark:text-white'>Job Position/Job role</label>
            <input type="text" className='border border-gray-300 rounded-md p-2 w-full' placeholder='e.g. Software Engineer, Data Scientist'/>  

        </div>
    </div>
        <div className='flex gap-5 justify-end'>
            <Button variant='ghost' onClick={() => setOpenDialog(false)}>
                Cancel
            </Button>
            <Button> Start Interview</Button>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default AddNewInterview
