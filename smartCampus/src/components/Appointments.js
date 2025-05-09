import React, { useState } from 'react';

export default function Appointments() {
  const [appointment, setAppointment] = useState({ lecturer: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Appointment booked with ${appointment.lecturer} on ${appointment.date}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Lecturer Name:
        <input type="text" value={appointment.lecturer} onChange={(e) => setAppointment({...appointment, lecturer: e.target.value})} />
      </label><br />
      <label>Date:
        <input type="date" value={appointment.date} onChange={(e) => setAppointment({...appointment, date: e.target.value})} />
      </label><br />
      <button type="submit">Book Appointment</button>
    </form>
  );
}
