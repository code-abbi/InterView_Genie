# InterViewGenie: AI-Powered Mock Interview Platform

InterViewGenie is a full-stack web application designed to help users prepare for technical interviews. It uses AI to generate tailored interview questions based on job descriptions and user experience, providing a realistic practice environment with instant feedback.

## 🚀 Live Demo

You can try out the live application here: **[InterViewGenie Live](https://interview-genieai.vercel.app/)**

### Landing Page
![Landing Page](https://github.com/code-abbi/InterView_Genie/blob/main/public/landing.png)

---

## ✨ Features

- **AI-Generated Questions:** Get interview questions customized to a specific job role, description, and experience level.
- **Realistic Practice:** Simulate a real interview experience using your webcam and microphone to practice your delivery and record your answers.
- **Instant AI Feedback:** Receive immediate, detailed feedback on your answers, including a performance rating and tips for improvement.
- **Progress Tracking:** Review past interviews and feedback to track your improvement over time on a personal dashboard.


## 🛠️ Tech Stack

- **Framework:** Next.js
- **Authentication:** Clerk
- **Database:** Neon PostgreSQL
- **ORM:** Drizzle ORM
- **AI:** Google Gemini
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Lucide React for icons.
- **Speech-to-Text:** `react-hook-speech-to-text` for transcribing user answers in real-time.

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Make sure you have Node.js (version 18.17.0 or higher) and npm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/code-abbi/InterView_Genie.git](https://github.com/code-abbi/InterView_Genie.git)
    cd InterView_Genie
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    - Create a file named `.env.local` in the root of your project.
    - Copy the contents of `.env.example` into `.env.local`.
    - Fill in the required API keys and database URL. See the "Environment Variables" section below for more details.

4.  **Push the database schema:**
    - This command will sync your database schema defined in `utils/schema.js` with your Neon database.
    ```sh
    npm run db:push
    ```

5.  **Run the development server:**
    ```sh
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## ⚙️ Environment Variables

To run this project, you will need to create a `.env.local` file and add the following environment variables:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your publishable key from the Clerk dashboard.
- `CLERK_SECRET_KEY`: Your secret key from the Clerk dashboard.
- `NEXT_PUBLIC_DRIZZLE_DB_URL`: Your database connection string from Neon.
- `NEXT_PUBLIC_GEMINI_API_KEY`: Your API key from Google AI Studio.
- `NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT`: The number of questions the AI should generate (e.g., 5).

*A `.env.example` file should be created in the repository to serve as a template.*

---

## 📋 How It Works

1.  **Define Your Interview:** On your dashboard, click "+ New Interview." Enter a job role, a detailed job description, and your years of experience. The AI uses this to generate a custom set of interview questions.
2.  **Prepare Your Setup:** You'll be directed to a preparation page where you'll need to enable your webcam and microphone.
3.  **Start the Interview:** Click "Start Interview" to see the first question.
4.  **Record & Get Feedback:** Press "Record Answer," and the app will capture and transcribe your response in real-time. After submitting, the AI will instantly provide a rating and detailed feedback.
5.  **Review and Improve:** After the interview, go to the "Feedback" section to see a comprehensive report of your performance.