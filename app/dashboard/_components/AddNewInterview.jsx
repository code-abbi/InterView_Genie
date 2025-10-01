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

function AddNewInterview({ openDialog, setOpenDialog }) {
    const [jobRole, setJobRole] = useState('');
    const [jobDesc, setJobDesc] = useState('');
    const [jobExp, setJobExp] = useState('');
    const[loading, setLoading] = useState(false);
    const router=useRouter();
    const {user} = useUser();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const InputPrompt = `Job Role: ${jobRole}, Job Description: ${jobDesc}, Years of Experience: ${jobExp}. Based on this, please provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions in a JSON format. The JSON should be an array of objects, where each object has only one field called "question".`;
            
            const result = await chatSession.sendMessage(InputPrompt);
            const mockJsonResponseText = result.response.text().replace('```json', '').replace('```', '');
            
            if (user?.primaryEmailAddress?.emailAddress) {
                const resp = await db.insert(MockInterview).values({
                    mockId: uuidv4(),
                    jsonMockResp: mockJsonResponseText,
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
            console.error("Failed to process interview creation:", error);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className={'max-w-2xl glass-effect'}>
                <DialogHeader>
                    {/* CHANGE: Made title text high-contrast */}
                    <DialogTitle className={'text-2xl font-bold text-slate-900 dark:text-slate-100'}>Tell us more about your job</DialogTitle>
                    {/* CHANGE: Made description text high-contrast */}
                    <DialogDescription className="text-slate-600 dark:text-slate-400">
                        Add details about your job position, description, and years of experience to get started.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={onSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                             {/* CHANGE: Made label text high-contrast */}
                            <Label className='font-semibold text-slate-800 dark:text-slate-200' htmlFor="job-role">Job Position / Role</Label>
                             {/* CHANGE: Added background to input for readability */}
                            <Input id="job-role" placeholder="e.g. Full Stack Developer" required onChange={(e) => setJobRole(e.target.value)} className="bg-white/50 dark:bg-slate-800/50" />
                        </div>
                        <div className="grid gap-2">
                            <Label className='font-semibold text-slate-800 dark:text-slate-200' htmlFor="job-desc">Job Description / Skills</Label>
                            <Textarea id="job-desc" placeholder="e.g. React, Next.js, Node.js, SQL" required onChange={(e) => setJobDesc(e.target.value)} className="bg-white/50 dark:bg-slate-800/50" />
                        </div>
                        <div className="grid gap-2">
                            <Label className='font-semibold text-slate-800 dark:text-slate-200' htmlFor="job-exp">Years of Experience</Label>
                            <Input id="job-exp" type="number" placeholder="e.g. 5" max="40" min="0" required onChange={(e) => setJobExp(e.target.value)} className="bg-white/50 dark:bg-slate-800/50" />
                        </div>
                    </div>
                
                    <DialogFooter>
                        <Button type="button" variant='ghost' onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white">
                            {loading ? 
                            <><LoaderPinwheel className='animate-spin mr-2'/> Generating...</>
                            : "Start Interview"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewInterview;