import React, { useState } from 'react';

// Helper component for SVG icons. In your project, you would install and import these from a library like 'lucide-react'.


const Users = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const BarChart3 = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);

const CheckCircle2 = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

const Clock = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);

// Reusable Card component for the dashboard
function DashboardCard({ icon, title, value, change, description }) {
  const isPositive = change && change.startsWith('+');
  const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300 ease-in-out">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg">
          {icon}
        </div>
        {change && (
          <span className={`font-semibold ${changeColor}`}>{change}</span>
        )}
      </div>
      <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{value}</h3>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">{title}</p>
      {description && <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{description}</p>}
    </div>
  );
}

// Revamped Dashboard Component
function Dashboard() {
  const recentInterviews = [
    { role: "Frontend Developer", date: "Aug 14, 2025", score: "88%", status: "Completed" },
    { role: "UX/UI Designer", date: "Aug 12, 2025", score: "92%", status: "Completed" },
    { role: "Backend Engineer", date: "Aug 10, 2025", score: "75%", status: "Completed" },
    { role: "Product Manager", date: "Aug 09, 2025", score: "N/A", status: "Incomplete" },
  ];

  return (
    <main className="flex-1 bg-gray-100 dark:bg-gray-950 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome!</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Here's a summary of your interview preparations.</p>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <DashboardCard 
            icon={<Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
            title="Total Interviews"
            value="42"
            change="+5.2%"
            description="Since last month"
          />
          <DashboardCard 
            icon={<CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />}
            title="Avg. Score"
            value="85%"
            change="+1.5%"
            description="All time average"
          />
          <DashboardCard 
            icon={<Clock className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />}
            title="Avg. Duration"
            value="24m"
            change="-2m"
            description="Compared to last week"
          />
          <DashboardCard 
            icon={<BarChart3 className="h-6 w-6 text-blue-600 dark:text-blue-400" />}
            title="Best Performance"
            value="98%"
            description="React Native Role"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Interviews List */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="py-3 pr-4 font-semibold text-gray-600 dark:text-gray-300">Role</th>
                    <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Date</th>
                    <th className="py-3 px-4 font-semibold text-gray-600 dark:text-gray-300">Score</th>
                    <th className="py-3 pl-4 font-semibold text-gray-600 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentInterviews.map((interview, index) => (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="py-4 pr-4 font-medium text-gray-800 dark:text-gray-100">{interview.role}</td>
                      <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{interview.date}</td>
                      <td className="py-4 px-4 font-semibold text-gray-700 dark:text-gray-200">{interview.score}</td>
                      <td className="py-4 pl-4">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          interview.status === 'Completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                        }`}>
                          {interview.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions / Performance Summary */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col">
             <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Performance Snapshot</h3>
             <div className="flex-grow flex items-center justify-center">
                {/* Placeholder for a chart - you could use a library like Recharts here */}
                <div className="relative w-48 h-48">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                        <path className="text-gray-200 dark:text-gray-700"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className="text-indigo-600 dark:text-indigo-400"
                            strokeDasharray="85, 100"
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-3xl font-bold text-gray-800 dark:text-white">85%</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Success</span>
                    </div>
                </div>
             </div>
             <button className="mt-6 w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 flex items-center justify-center space-x-2">
                <Bot className="h-5 w-5" />
                <span>Start a New Mock Interview</span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}


// Main App Component
export default function App() {
  // This state would determine if the user prefers dark or light mode.
  // You can hook this up to a toggle button.
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 font-sans">
        <Header />
        <Dashboard />
      </div>
    </div>
  );
}
