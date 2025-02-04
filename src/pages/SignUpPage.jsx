import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/SignUpPage.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      // Check if the user already exists
      const response = await axios.get('http://localhost:5005/users');
      const userExists = response.data.find((user) => user.email === email);

      if (userExists) {
        setError('User with this email already exists.');
        return;
      }

      // Create new user object
      const newUser = {
        email,
        fullName,
        password,
      };

      // Post request new user to the backend
      await axios.post('http://localhost:5005/users', newUser);
      setSuccess('Account created successfully! Redirecting to login page...');

      // Redirect to home after 2 seconds
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp} className="signup-form">
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
}

export default SignUpPage;
