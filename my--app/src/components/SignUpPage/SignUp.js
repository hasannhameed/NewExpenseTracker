// src/components/SignUpPage.js
import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUpPage.css';

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User registered successfully!');
      navigate('/UserProfile');
    } catch (error) {
      console.error("Error signing up:", error);
      alert('Error signing up: ' + error.message);
    }
  };

  return (
    <Fragment>
      <div className="sign-up-page">
        <form onSubmit={handleSubmit} className="sign-up-form">
          <h1>Sign Up</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
        <button className="login-button">
          <Link to="/login" className="login-link">Have an account? Login</Link>
        </button>
      </div>
    </Fragment>
  );
}

export default SignUpPage;
