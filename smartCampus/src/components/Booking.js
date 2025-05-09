import React, { useState, useEffect } from 'react';
import api from '../api';

function Booking() {
  const [service, setService] = useState('study room');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [adminId, setAdminId] = useState('');
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch admin list when 'appointment' is selected
  useEffect(() => {
    if (service === 'appointment') {
      const fetchAdmins = async () => {
        try {
          const response = await api.get('/admins'); // Assumes you have this endpoint
          setAdmins(response.data);
        } catch (err) {
          console.error('Failed to load admins:', err);
          setAdmins([]);
        }
      };

      fetchAdmins();
    } else {
      setAdmins([]); // Clear admins if not appointment
      setAdminId('');
    }
  }, [service]);

  const handleBooking = async (e) => {
    e.preventDefault();
  
    let lecturerName = '';
    if (service === 'appointment') {
      const selectedAdmin = admins.find((admin) => admin._id === adminId);
      if (selectedAdmin) {
        lecturerName = selectedAdmin.Fullname;
      }
    }
  
    const bookingData = {
      service,
      date,
      time,
      ...(lecturerName && { lecturer: lecturerName }), // Only include if available
    };
  
    try {
      console.log('Sending booking data:', bookingData);
      const response = await api.post('/book', bookingData);
      if (response.status === 201) {
        setMessage(`Booking confirmed: ${response.data.booking.service} on ${response.data.booking.date} at ${response.data.booking.time}`);
      } else {
        setMessage(`Error: ${response.data.error}`);
      }
    } catch (err) {
      setMessage('Error: Unable to connect to the server');
    }
  };

  return (
    <div className="booking">
      <h2>Book a Service</h2>
      <form onSubmit={handleBooking}>
        <label>Service:
          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="study room">Study Room</option>
            <option value="appointment">Appointment</option>
          </select>
        </label>

        {service === 'appointment' && (
          <label>Choose Lecturer:
            <select value={adminId} onChange={(e) => setAdminId(e.target.value)} required>
              <option value="">-- Select an Admin --</option>
              {admins.map((admin) => (
                <option key={admin._id} value={admin._id}>
                  {admin.Fullname}
                </option>
              ))}
          </select>
          </label>
        )}

        <label>Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <label>Time:
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </label>
        <button type="submit">Book</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Booking;
