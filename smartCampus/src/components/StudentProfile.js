import React, { useState, useEffect } from 'react';
import api from '../api'; // Adjust the path as needed

function StudentProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    const fetchProfile = async () => {
      if (!userId) {
        setError('User ID not found in localStorage.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await api.get(`/user/${userId}`);

        const data = await response.json?.() ?? response.data;
        setProfile(data);
        setError('');
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError('Failed to load user profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <div className="text-center p-4">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;
  if (!profile) return <div className="text-center p-4">No profile data available</div>;

  const { Fullname, _id, Subjects, email } = profile;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Student Profile</h2>
      <div className="space-y-4">
        <ProfileField label="Student ID" value={_id} />
        <ProfileField label="Fullname" value={Fullname} />
        <ProfileField label="Subjects" value={Subjects} />
        <ProfileField label="Email" value={email} />
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div className="profile-field border-b pb-2 last:border-b-0">
      <strong className="text-gray-700">{label}:</strong>
      <span className="ml-2">{value || 'N/A'}</span>
    </div>
  );
}

export default StudentProfile;
