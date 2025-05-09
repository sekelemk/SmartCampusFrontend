import { useState } from 'react';

// Shared styling approach for both Admin and Student dashboards
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('admin');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Tab Selector */}
        <div className="mb-6 flex space-x-4">
          <button 
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'admin' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin Dashboard
          </button>
          <button 
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'student' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setActiveTab('student')}
          >
            Student Dashboard
          </button>
        </div>
        
        {/* Conditional rendering based on active tab */}
        {activeTab === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const stats = {
    totalBookings: 125,
    issuesReported: 14,
    activeUsers: 87,
  };

  const statItems = [
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      title: "Issues Reported",
      value: stats.issuesReported,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      ),
      bgColor: "bg-red-100",
      textColor: "text-red-600"
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    }
  ];

  const quickActions = [
    {
      title: "Generate Reports",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
        </svg>
      )
    },
    {
      title: "Manage Users",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    },
    {
      title: "System Settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      title: "Manage Bookings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-14.25 0a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3z" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your application from one central location</p>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {statItems.map((item, index) => (
              <div key={index} className={`${item.bgColor} rounded-lg p-4 flex items-center shadow-sm`}>
                <div className={`${item.textColor} p-3 rounded-lg`}>
                  {item.icon}
                </div>
                <div className="ml-4">
                  <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-sm text-gray-500">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button 
                key={index} 
                className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors shadow-sm"
              >
                <div className="text-blue-600 mb-2">
                  {action.icon}
                </div>
                <span className="text-sm font-medium text-gray-700">{action.title}</span>
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200">
            <div className="p-4 flex">
              <div className="text-sm text-gray-500 w-24">10:45 AM</div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">User John Doe updated their profile</p>
              </div>
            </div>
            <div className="p-4 flex">
              <div className="text-sm text-gray-500 w-24">09:30 AM</div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">New booking created by Sarah Smith</p>
              </div>
            </div>
            <div className="p-4 flex">
              <div className="text-sm text-gray-500 w-24">Yesterday</div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">System maintenance completed</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Student Dashboard Component
const StudentDashboard = () => {
  const menuItems = [
    {
      title: "Profile",
      description: "View and update your personal information",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </svg>
      ),
      path: "/StudentProfile",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    {
      title: "Timetable",
      description: "Check your class schedule and upcoming events",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      ),
      path: "/ViewTimetable",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    {
      title: "Appointments",
      description: "Schedule meetings with professors and advisors",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      path: "/Booking",
      bgColor: "bg-purple-100",
      textColor: "text-purple-600"
    },
    {
      title: "Notifications",
      description: "View important announcements and updates",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
      path: "/Notifications",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600"
    }
  ];

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
          <p className="text-gray-500">Welcome back! Manage your academic journey from one place.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {menuItems.map((item, index) => (
            <a 
              href={item.path} 
              key={index}
              className="block group"
            >
              <div className="bg-white rounded-lg border border-gray-200 p-4 flex items-center hover:shadow-md transition-shadow">
                <div className={`${item.bgColor} ${item.textColor} p-3 rounded-lg`}>
                  {item.icon}
                </div>
                <div className="ml-4 flex-1">
                  <h2 className="text-lg font-medium text-gray-900">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
                <div className="text-gray-400 group-hover:text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-gray-600">Courses</div>
            </div>
            <div className="bg-green-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-gray-600">Appointments</div>
            </div>
            <div className="bg-purple-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Notifications</div>
            </div>
            <div className="bg-amber-100 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">85%</div>
              <div className="text-sm text-gray-600">Attendance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;