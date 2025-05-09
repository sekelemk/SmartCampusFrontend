import { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart2, PieChart, LineChart, Home, Settings, Users, HelpCircle, Activity, Leaf, Tractor, BoxSelect, Droplet, User, ChevronDown } from 'lucide-react';
import { LineChart as RechartsLineChart, BarChart as RechartsBarChart, PieChart as RechartsPieChart, 
         Bar, Line, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

// Sample data for charts
const activityData = [
  { name: 'Field visit 01', value: 80, color: '#4CAF50' },
  { name: 'Field visit 02', value: 65, color: '#4CAF50' },
  { name: 'Field visit 03', value: 40, color: '#4CAF50' }
];

const cropData = [
  { name: 'Paddy', value: 70, color: '#4CAF50' },
  { name: 'Tomato', value: 55, color: '#4CAF50' },
  { name: 'Others', value: 30, color: '#4CAF50' }
];

const pieData = [
  { name: 'Planted', value: 70, color: '#4CAF50' },
  { name: 'Unplanted', value: 30, color: '#f44336' }
];

const statCardData = [
  { 
    title: "Farm", 
    value: "50", 
    subtitle: "Total farms in the system", 
    icon: <Leaf className="text-green-600" size={24} /> 
  },
  { 
    title: "Farmers", 
    value: "200", 
    subtitle: "Farmers enrolled", 
    icon: <User className="text-blue-600" size={24} /> 
  },
  { 
    title: "Acre", 
    value: "850", 
    subtitle: "Total acres registered", 
    icon: <BoxSelect className="text-purple-600" size={24} /> 
  },
  { 
    title: "Mill", 
    value: "200", 
    subtitle: "Mill bags already harvested", 
    icon: <Tractor className="text-orange-600" size={24} /> 
  },
  { 
    title: "Cluster", 
    value: "100", 
    subtitle: "Total clusters created", 
    icon: <Droplet className="text-cyan-600" size={24} /> 
  },
  { 
    title: "Officer", 
    value: "50", 
    subtitle: "Fields officers assigned", 
    icon: <User className="text-indigo-600" size={24} /> 
  }
];

const activitySummary = [
  { title: "22 Overdue Task", subtitle: "12 Pending task need attention" }
];

const financialSummary = [
  { title: "$2033", subtitle: "Payment Due in 7 days" },
  { title: "$500", subtitle: "Payment this week" },
  { title: "$123", subtitle: "Due in 3 days" }
];

// Card component for summary stats
const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div className="mr-4">
        {icon}
      </div>
      <div>
        <div className="flex items-center">
          <h3 className="font-bold text-xl">{value}</h3>
        </div>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
    </div>
  );
};

// Activity card component
const ActivityCard = ({ title, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <Activity className="text-blue-500 mr-2" size={20} />
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

// Financial card component
const FinancialCard = ({ title, subtitle }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center">
        <div className="bg-gray-200 rounded-full p-2 mr-2">
          <div className="bg-green-500 rounded-full p-1"></div>
        </div>
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-gray-500 text-xs">{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

// Progress bar component
const ProgressBar = ({ value, color }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
      <div 
        className={`h-2 rounded-full ${color}`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default function VayeDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-gray-800 text-white transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-4 flex items-center">
          {sidebarOpen && (
            <div className="flex items-center">
              <Leaf className="text-green-500 mr-2" size={24} />
              <span className="font-bold text-sm">VayeDashboard</span>
            </div>
          )}
          {!sidebarOpen && <Leaf className="text-green-500 mx-auto" size={24} />}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-2"></div>

        {/* Menu Items */}
        <nav className="flex-1">
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700 text-green-500`}>
            <Home size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Dashboard</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <Tractor size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Farm Management</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <BoxSelect size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Field</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <Users size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Cluster</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <Activity size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Activity</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <Droplet size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Farmer</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <HelpCircle size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Work Instructions</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <LineChart size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Live Monitoring</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <BarChart2 size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Reports</span>}
          </div>
          
          <div className={`p-4 flex items-center ${sidebarOpen ? 'justify-start' : 'justify-center'} hover:bg-gray-700`}>
            <Settings size={20} />
            {sidebarOpen && <span className="ml-3 text-sm">Settings</span>}
          </div>
        </nav>

        {/* Toggle button */}
        <div className="p-4 flex justify-end">
          <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
            {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">Organization Name</h1>
            
            <div className="relative">
              <button onClick={toggleProfileMenu} className="flex items-center">
                <span className="mr-2 text-sm">Workspace Admin</span>
                <div className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center">
                  <User size={16} />
                </div>
                <ChevronDown size={16} className="ml-1" />
              </button>
              
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Subscription</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
            {statCardData.map((stat, index) => (
              <StatCard 
                key={index}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
                icon={stat.icon}
              />
            ))}
          </div>

          {/* Activity Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {activitySummary.map((item, index) => (
              <ActivityCard 
                key={index}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
            
            {financialSummary.map((item, index) => (
              <FinancialCard 
                key={index}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </div>

          {/* Overview Section */}
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Planted vs Unplanted */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md font-medium mb-4">Planted vs Unplanted</h3>
              <div className="flex">
                <div className="w-1/3">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600">70% Planted</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <span className="text-sm text-gray-600">30% Unplanted</span>
                  </div>
                </div>
                <div className="w-2/3">
                  <ResponsiveContainer width="100%" height={150}>
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        startAngle={90}
                        endAngle={450}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Crop Summary */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md font-medium mb-4">Crop Summary</h3>
              {cropData.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm">{item.value}%</span>
                  </div>
                  <ProgressBar value={item.value} color="bg-green-500" />
                </div>
              ))}
            </div>

            {/* Activity Summary */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md font-medium mb-4">Activity Summary</h3>
              {activityData.map((item, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">{item.name}</span>
                    <span className="text-sm">{item.value}%</span>
                  </div>
                  <ProgressBar value={item.value} color="bg-green-500" />
                </div>
              ))}
            </div>
          </div>
          
          {/* Additional Metrics */}
          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h3 className="text-md font-medium mb-4">Harvest Metrics</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Expected Harvest</h4>
                <p className="text-lg font-semibold">2.1 Tons</p>
                <p className="text-xs text-gray-500">About 2 tons on 50 acre</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Spend to Last 30 days</h4>
                <p className="text-lg font-semibold">$ 2033</p>
                <p className="text-xs text-gray-500">Payment Due in 7 days</p>
              </div>
              <div>
                <h4 className="text-sm text-gray-500 mb-1">Expected Revenue</h4>
                <p className="text-lg font-semibold">$500</p>
                <p className="text-xs text-gray-500">For next 5 days</p>
              </div>
            </div>
          </div>
          
          {/* Trend Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md font-medium mb-4">Farm Production Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsLineChart data={[
                  {name: 'Jan', value: 200},
                  {name: 'Feb', value: 350},
                  {name: 'Mar', value: 320},
                  {name: 'Apr', value: 400},
                  {name: 'May', value: 450},
                  {name: 'Jun', value: 500}
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} dot={{ r: 4 }} />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-md font-medium mb-4">Revenue Distribution</h3>
              <ResponsiveContainer width="100%" height={200}>
                <RechartsBarChart data={[
                  {name: 'Crop A', value: 400},
                  {name: 'Crop B', value: 300},
                  {name: 'Crop C', value: 550},
                  {name: 'Crop D', value: 270},
                  {name: 'Crop E', value: 500}
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4CAF50" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}