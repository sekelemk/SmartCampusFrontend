// components/AdminDashboard.jsx
import React from 'react';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl border-r">
        <div className="p-6 border-b">
          <h1 className="text-3xl font-bold text-blue-600">Admin Portal</h1>
        </div>
        <nav className="mt-6 space-y-2">
          {['Dashboard', 'Users', 'Settings'].map((item) => (
            <a
              key={item}
              href="#"
              className="block px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition rounded-r-full"
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-8 py-5 sticky top-0 z-10">
          <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800 transition">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <img
              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500"
              src="https://via.placeholder.com/150"
              alt="Admin avatar"
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              ['Total Bookings', 125],
              ['Issues Reported', 14],
              ['Active Users', 87],
            ].map(([label, count]) => (
              <div key={label} className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition">
                <h3 className="text-sm font-medium text-gray-500">{label}</h3>
                <p className="mt-2 text-3xl font-bold text-gray-900">{count}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-10">
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Generate Reports', 'Manage Users', 'System Settings', 'Manage Bookings'].map((action) => (
                <button
                  key={action}
                  className="bg-white p-6 rounded-xl shadow hover:bg-blue-50 transition text-left"
                >
                  <span className="text-sm font-medium text-gray-700">{action}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-6">Recent Activity</h3>
            <ul className="space-y-4">
              {[
                {
                  message: (
                    <>
                      <span className="font-medium text-gray-800">John Doe</span> updated their profile.
                    </>
                  ),
                  time: '10:45 AM',
                },
                {
                  message: (
                    <>
                      New booking created by <span className="font-medium text-gray-800">Sarah Smith</span>.
                    </>
                  ),
                  time: '09:30 AM',
                },
                {
                  message: 'System maintenance completed.',
                  time: 'Yesterday',
                },
              ].map((activity, idx) => (
                <li key={idx} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
                  <p className="text-sm text-gray-600">{activity.message}</p>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
