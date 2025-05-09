import React, { useState } from 'react';
import axios from 'axios';
import './userStyling.css';
import api from '../api';
import { Link } from 'react-router-dom';

const Adduser = () => {
  const [formData, setFormData] = useState({
    Fullname: '',
    email: '',
    password: '',
    Role: '',
    Subjects: [],
  });

  const [newSubject, setNewSubject] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const isStudent = formData.Role === 'student';

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'Role') {
      setFormData({
        ...formData,
        Role: value,
        Subjects: value === 'student' ? formData.Subjects : [], // Clear subjects if not student
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addSubject = () => {
    const trimmed = newSubject.trim();
    if (trimmed && !formData.Subjects.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        Subjects: [...prev.Subjects, trimmed],
      }));
      setNewSubject('');
    }
  };

  const handleSubjectKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSubject();
    }
  };

  const removeSubject = (index) => {
    setFormData((prev) => ({
      ...prev,
      Subjects: prev.Subjects.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await api.post('/adduser', formData);
      setMessage(response.data.message);
      setFormData({ Fullname: '', email: '', password: '', Role: '', Subjects: [] });
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding user');
    }
  };

  return (
    <div className="add-user-form">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="Fullname"
          value={formData.Fullname}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Role:</label>
        <select name="Role" value={formData.Role} onChange={handleChange} required>
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="care taker">Care Taker</option>
        </select>

        {isStudent && (
          <div className="subjects-section">
            <label>Subjects (optional):</label>
            <div className="subject-input">
              <input
                type="text"
                placeholder="Enter subject"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyDown={handleSubjectKeyDown}
              />
              <button type="button" onClick={addSubject}>Add</button>
            </div>
            {formData.Subjects.length > 0 && (
              <ul className="subject-list">
                {formData.Subjects.map((subject, index) => (
                  <li key={index}>
                    {subject}
                    <button type="button" onClick={() => removeSubject(index)}>x</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <button type="submit">Add User</button>
      </form>

      <div className="signup-link">
        <p>Already have an account? <Link to="/">Sign in</Link></p>
      </div>

      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default  Adduser;
