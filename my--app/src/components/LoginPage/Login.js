import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'

const API_KEY = 'AIzaSyDMGEPT6_WQcPUgRPQu-lYfN6dO2K-rEv4';
const LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, returnSecureToken: true })
      });
      const data = await response.json();
      if (response.ok) {
        alert('User logged in successfully!');
        console.log(data);
        navigate('/ExpenseTracker')
      } else {
        throw new Error(data.error.message || 'Failed to log in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in: ' + error.message);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
      <button className="signup-button"><Link to='/'>Don't have an account? Sign Up</Link></button>
    </div>
  );
};

export default Login;
