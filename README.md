InterViewGenie: AI-Powered Mock Interview Platform
InterViewGenie is a web application designed to help users prepare for technical interviews. It uses AI to generate tailored interview questions based on job descriptions and user experience, providing a realistic practice environment.

Features ✨
AI-Generated Questions: Get interview questions customized to a specific job role, description, and experience level.

Realistic Practice: Simulate a real interview experience using your webcam and microphone to practice your delivery and record your answers.

Instant AI Feedback: Receive immediate, detailed feedback on your answers, including a performance rating and tips for improvement.

Progress Tracking: Review past interviews and feedback to track your improvement over time on a personal dashboard.

Tech Stack 🛠️
Framework: Next.js

Authentication: Clerk

Database: Neon PostgreSQL

ORM: Drizzle ORM

AI: Google Gemini

Styling: Tailwind CSS

UI Components: shadcn/ui, Lucide React for icons.

Speech-to-Text: react-hook-speech-to-text for transcribing user answers in real-time.

Getting Started 🚀
First, run the development server:

Bash

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.js. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Geist, a new font family for Vercel.

How It Works 📋
Define Your Interview: On your dashboard, click "+ New Interview." You'll be prompted to enter a job role, a detailed job description, and your years of experience. The AI uses this to generate a custom set of interview questions.

Prepare Your Setup: You'll be directed to a preparation page where you'll need to enable your webcam and microphone.

Start the Interview: Click "Start Interview" to see the first question.

Record & Get Feedback: When you're ready, press "Record Answer." The app will capture your response and transcribe it in real-time. After submitting, the AI will instantly provide a rating and detailed feedback.

Review and Improve: After the interview, go to the "Feedback" section to see a comprehensive report of your performance. Here, you can review each question, your answer, and the AI's feedback to identify areas for improvement.

Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.

Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.