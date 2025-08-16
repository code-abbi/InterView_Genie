"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAIModal'
import { LoaderPinwheel } from 'lucide-react'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs'
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation'

function AddNewInterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobRole, setJobRole] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExp, setJobExp] = useState('');
    const[loading, setLoading] = useState(false);
    const[jsonResponse, setJsonResponse] = useState([]);
    const router=useRouter();
    const {user, isLoaded} = useUser();


const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        // 1. THE MODIFIED PROMPT: Asking for ONLY questions
        const InputPrompt = `Job Role: ${jobRole}, Job Description: ${jobDesc}, Years of Experience: ${jobExp}. Based on this, please provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions in a JSON format. The JSON should be an array of objects, where each object has only one field called "question".`;
        
        const result = await chatSession.sendMessage(InputPrompt);
        const mockJsonResponseText = result.response.text().replace('```json', '').replace('```', '');
        
        // 2. The JSON.parse is now safely inside the try...catch block
        const parsedResp = JSON.parse(mockJsonResponseText);
        setJsonResponse(parsedResp);

        // --- Database Insertion ---
        if (user?.primaryEmailAddress?.emailAddress && mockJsonResponseText) {
            const resp = await db.insert(MockInterview).values({
                mockId: uuidv4(),
                jsonMockResp: mockJsonResponseText, // Storing the questions JSON
                jobPosition: jobRole,
                jobDesc: jobDesc,
                jobExperience: jobExp,
                createdBy: user.primaryEmailAddress.emailAddress,
                createdAt: dayjs().format('DD-MM-YYYY')
            }).returning({ mockId: MockInterview.mockId });

            if (resp && resp.length > 0) {
                setOpenDialog(false);
                router.push(`/dashboard/interview/${resp[0].mockId}`);
            }
        }
    } catch (error) {
        console.error("Failed to parse JSON or call API:", error);
        alert("Sorry, there was an error generating questions. Please try again.");
    } finally {
        setLoading(false);
    }
};
  return (
    <div>
      <div className='p-10 border rounded-lg bg-primary
      hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={() => setOpenDialog(true)}>
        <h2 className='text-lg text-center font-semibold text-white'>
            + New Interview
        </h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className={'max-w-2xl'}>
          <DialogHeader>
            <DialogTitle className={'text-2xl  text-orange-400'}>Tell us more about your job</DialogTitle>
            <DialogDescription>
                Add details about your job position, description, and years of experience.
            </DialogDescription>
          </DialogHeader>

        <form  onSubmit={onSubmit}>
          <div className="space-y-4 py-4 ">
            <div className="grid gap-2">
              <Label className=' text-orange-400' htmlFor="job-role">Job Position/Job role</Label>
              <Input id="job-role" placeholder="e.g. Full Stack Developer" required 
               onChange={(event)=>setJobRole(event.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label className=' text-orange-400' htmlFor="job-desc">Job Description</Label>
              <Textarea id="job-desc" placeholder="e.g. React, Angular, NodeJS" required 
              onChange={(event)=>setJobDesc(event.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label className=' text-orange-400' htmlFor="job-exp">Years of Experience</Label>
              <Input id="job-exp" type="number" placeholder="e.g. 5" max="40" min="0" required 
              onChange={(event)=>setJobExp(event.target.value)}/>
            </div>
          </div>
        
          <DialogFooter>
            <Button type="Button" variant='ghost' onClick={() => setOpenDialog(false)}>
                Cancel
            </Button>
            <Button type="submit" disabled={loading || !isLoaded} >
              {loading ? 
              <><LoaderPinwheel className='animate-spin'/> Generating from AI
              </>: "Start Interview"}
              </Button>
          </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewInterview