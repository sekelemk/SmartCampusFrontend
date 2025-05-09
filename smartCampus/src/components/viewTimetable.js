import React, { useEffect, useState } from 'react';
import api from '../api'; // Ensure this is correctly configured

const ViewTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error('User ID not found in local storage.');
      const response = await api.get(`/user/${userId}`);
      return response.data;
    } catch (err) {
      console.error('User fetch error:', err);
      throw new Error('Unable to retrieve user information.');
    }
  };

  const fetchTimetables = async (userData) => {
    try {
      const response = await api.get('/timetables');
      const allTimetables = response.data;

      if (userData.Role === 'admin') {
        setTimetables(allTimetables);
      } else if (userData.Role === 'student') {
        // Assuming userData.Subjects is an array of subject names or IDs
        const filtered = allTimetables.filter(item =>
          userData.Subjects.includes(item.subject) // Directly check the subject
        );
        setTimetables(filtered);
      } else {
        setTimetables([]); // fallback for other roles
      }
    } catch (err) {
      console.error('Timetable fetch error:', err);
      setError('Failed to load timetables.');
    }
  };

  useEffect(() => {
    const loadTimetable = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
        await fetchTimetables(userData);
      } catch (err) {
        setError(err.message || 'Failed to load user or timetable.');
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();
  }, []);

  if (loading) return <p>Loading timetables...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h2>Timetables</h2>
      {timetables.length === 0 ? (
        <p>No timetables available for your role.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Day</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {timetables.map(item => (
              <tr key={item._id}>
                <td>{item.subject}</td>
                <td>{item.day}</td>
                <td>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewTimetable;
