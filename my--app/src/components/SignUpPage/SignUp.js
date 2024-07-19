import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import './SignUpPage.css';

const API_KEY = 'AIzaSyDMGEPT6_WQcPUgRPQu-lYfN6dO2K-rEv4';
const SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;

function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(SIGN_UP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true
        })
      });
      const data = await response.json();
      if (response.ok) {
        // Save additional user information (name) to your own backend or Firestore if needed
        alert('User registered successfully!');
        console.log(data);
      } else {
        throw new Error(data.error.message || 'Failed to sign up');
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert('Error signing up: ' + error.message);
    }
  };

  return (
    <Fragment>
      <Header />
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
