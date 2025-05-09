// File: App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import Notifications from './components/Notifications';
import Timetable from './components/Timetable';
import Booking from './components/Booking';
import ReportIssue from './components/ReportIssue';
import BookingsList from './components/BookingsList';
import BookingDetails from './components/BookingDetails';
import Adduser from './components/Adduser';
import ViewTimetable from './components/viewTimetable';
import StudentDashboard from './components/StudentDashboard';
import StudentProfile from './components/StudentProfile';
import Vaye from './components/vaye'; // Capitalized to use as a component

import './styles.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  // If you want to use this later, uncomment
  /*
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);
  */

  return (
    <Router>
      <Routes>
        <Route path='/Vaye' element={<Vaye />} />
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/notifications' element={<Notifications />} />
        <Route path='/timetable' element={<Timetable />} />
        <Route path='/booking' element={<Booking />} />
        <Route path="/BookingsList" element={<BookingsList />} />
        <Route path="/bookings2/:id" element={<BookingDetails />} />
        <Route path="/Adduser" element={<Adduser />} />
        <Route path="/viewTimetable" element={<ViewTimetable />} />
        <Route path='/report-issue' element={<ReportIssue />} />
        <Route path='/StudentProfile' element={<StudentProfile />} />
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
