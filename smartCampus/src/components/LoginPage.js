import React, { useState } from 'react';
import api from '../api'; // Importing the API instance for making requests

// LoginPage component - handles user authentication
const LoginPage = () => {
  // State for form inputs and component status
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Enable loading state
    setError(''); // Clear previous errors
  
  //   const response = await api.post('/login2', { email, password });
  
  //   // ✅ Extract user info from response
  //   const { _id, Role } = response.data.user;

  //   // ✅ Save user ID and role in localStorage
  //   localStorage.setItem('userId', _id);
  //   localStorage.setItem('role', Role);

  //   // ✅ Navigate based on role
  //   if (Role === 'student') {
  //     navigate('/StudentDashboard'); // Navigate to Student Dashboard if role is 'student'
  //   } else if (role === 'admin') {
  //     navigate('/dashboard'); // Navigate to Admin Dashboard if role is 'admin'
  //   } else {
  //     setError('Unknown user role');
  //   }
  // } catch (err) {
  //   console.error('Login failed:', err);
  //   setError('Invalid email or password');
  // }




    try {
      // Send login request using fetch instead of api library
      const response = await api.post('/login2', { email, password });
      
     
      
      if (!response.status === 200) {
       
        throw new Error(response.message || 'Login failed');
      }
  
      // Extract user info from response
      const { _id, Role } = response.data.user;
  
      // Save user data in browser storage
      localStorage.setItem('userId', _id);
      localStorage.setItem('role', Role);
  
      // Navigate based on user role using window.location instead of react-router
      if (Role === 'student') {
        window.location.href = '/StudentDashboard';
      } else if (Role === 'admin') {
        window.location.href = '/dashboard';
      } else {
        setError('Unknown user role');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false); // Disable loading state regardless of outcome
    }
  };

  // The UI rendering
  return (
    <div style={{
      display: 'flex',              // Uses flexbox for layout
      flexDirection: 'column',      // Stack children vertically
      alignItems: 'center',         // Center children horizontally
      justifyContent: 'center',     // Center children vertically
      minHeight: '100vh',           // Full viewport height
      backgroundColor: '#f3f4f6',   // Light gray background
      padding: '0 16px'             // Horizontal padding
    }}>
      {/* Card container - holds the form */}
      <div style={{
        width: '100%',              // Full width of parent
        maxWidth: '400px',          // Cap maximum width
        padding: '32px',            // Generous internal spacing
        backgroundColor: '#ffffff', // White background
        borderRadius: '8px',        // Rounded corners
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        marginBottom: '20px'        // Space below card
      }}>
        {/* Title */}
        <h2 style={{
          fontSize: '24px',         // Large text size
          fontWeight: 'bold',       // Bold text weight
          marginBottom: '24px',     // Space below title
          textAlign: 'center',      // Center the text
          color: '#1f2937'          // Dark gray text color
        }}>Login</h2>
        
        {/* Error message - conditionally rendered */}
        {error && (
          <div style={{
            marginBottom: '16px',   // Space below error message
            padding: '12px',        // Internal padding
            backgroundColor: '#fee2e2', // Light red background
            border: '1px solid #ef4444', // Red border
            color: '#b91c1c',       // Dark red text
            borderRadius: '4px'     // Slightly rounded corners
          }}>
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',          // Use flexbox
          flexDirection: 'column',  // Stack form elements vertically
          gap: '24px'               // Space between form elements
        }}>
          {/* Email field container */}
          <div>
            {/* Input label */}
            <label 
              htmlFor="email" 
              style={{
                display: 'block',       // Make label a block element
                fontSize: '14px',       // Slightly smaller text
                fontWeight: '500',      // Medium font weight
                color: '#374151',       // Medium gray text
                marginBottom: '4px'     // Small space below label
              }}
            >
              Email
            </label>
            {/* Email input */}
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',          // Full width of container
                padding: '8px 12px',    // Vertical and horizontal padding
                border: '1px solid #d1d5db', // Light gray border
                borderRadius: '4px',    // Rounded corners
                fontSize: '16px',       // Comfortable reading size
                outline: 'none',        // Remove default focus outline
                transition: 'border-color 0.2s' // Smooth border transition
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'; // Blue border
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; // Subtle glow
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db'; // Reset to gray border
                e.target.style.boxShadow = 'none'; // Remove glow
              }}
            />
          </div>

          {/* Password field container */}
          <div>
            {/* Password label */}
            <label 
              htmlFor="password" 
              style={{
                display: 'block',       // Make label a block element
                fontSize: '14px',       // Slightly smaller text
                fontWeight: '500',      // Medium font weight
                color: '#374151',       // Medium gray text
                marginBottom: '4px'     // Small space below label
              }}
            >
              Password
            </label>
            {/* Password input */}
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',          // Full width of container
                padding: '8px 12px',    // Vertical and horizontal padding
                border: '1px solid #d1d5db', // Light gray border
                borderRadius: '4px',    // Rounded corners
                fontSize: '16px',       // Comfortable reading size
                outline: 'none',        // Remove default focus outline
                transition: 'border-color 0.2s' // Smooth border transition
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6'; // Blue border
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)'; // Subtle glow
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#d1d5db'; // Reset to gray border
                e.target.style.boxShadow = 'none'; // Remove glow
              }}
            />
          </div>

          {/* Options row with Remember me and Forgot password */}
          <div style={{
            display: 'flex',          // Use flexbox
            justifyContent: 'space-between', // Push items to opposite ends
            alignItems: 'center'      // Center items vertically
          }}>
            {/* Remember me checkbox */}
            <div style={{
              display: 'flex',        // Use flexbox
              alignItems: 'center'    // Center items vertically
            }}>
              <input
                id="remember-me"
                type="checkbox"
                style={{
                  height: '16px',     // Checkbox height
                  width: '16px',      // Checkbox width
                  borderRadius: '4px', // Slightly rounded corners
                  border: '1px solid #d1d5db', // Light gray border
                  accentColor: '#3b82f6' // Blue when checked
                }}
              />
              <label 
                htmlFor="remember-me" 
                style={{
                  marginLeft: '8px',  // Space between checkbox and label
                  fontSize: '14px',   // Slightly smaller text
                  color: '#4b5563'    // Medium gray text
                }}
              >
                Remember me
              </label>
            </div>
            
            {/* Forgot password link */}
            <div style={{
              fontSize: '14px'        // Slightly smaller text
            }}>
              <a 
                href="/forgot-password" 
                style={{
                  color: '#2563eb',   // Blue text color
                  textDecoration: 'none' // No underline
                }}
                onMouseEnter={(e) => {
                  e.target.style.textDecoration = 'underline'; // Add underline on hover
                }}
                onMouseLeave={(e) => {
                  e.target.style.textDecoration = 'none'; // Remove underline when not hovering
                }}
              >
                Forgot password?
              </a>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',            // Full width of container
              padding: '10px 16px',     // Vertical and horizontal padding
              backgroundColor: loading ? '#60a5fa' : '#2563eb', // Blue button, lighter when loading
              color: '#ffffff',         // White text
              border: 'none',           // No border
              borderRadius: '4px',      // Rounded corners
              fontSize: '16px',         // Comfortable text size
              fontWeight: '500',        // Medium font weight
              cursor: loading ? 'not-allowed' : 'pointer', // Change cursor based on state
              transition: 'background-color 0.2s', // Smooth color transition
              outline: 'none'           // Remove default focus outline
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = '#1d4ed8'; // Darker blue on hover
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = '#2563eb'; // Return to original blue
            }}
            onFocus={(e) => {
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.5)'; // Blue glow
            }}
            onBlur={(e) => {
              e.target.style.boxShadow = 'none'; // Remove glow
            }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Signup link section */}
        <div style={{
          marginTop: '24px',        // Space above signup section
          textAlign: 'center',      // Center the text
          fontSize: '14px',         // Slightly smaller text
          color: '#4b5563'          // Medium gray text
        }}>
          <p className="signup-link">
            Don't have an account?{' '}
            <a 
              href="/Adduser" 
              style={{
                color: '#2563eb',   // Blue text color
                textDecoration: 'none' // No underline initially
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline'; // Add underline on hover
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none'; // Remove underline when not hovering
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;