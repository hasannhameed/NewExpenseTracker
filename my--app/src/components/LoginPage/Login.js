// src/components/Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const auth = getAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      setUser(loggedInUser);
      alert('User logged in successfully!');
      
    } catch (error) {
      console.error('Error logging in:', error);
     alert('Error logging in: ' + error.message);
    }
  };

  const handleSendVerificationEmail = async () => {
    try {
      if (user) {
        await sendEmailVerification(user);
        alert('Verification email sent! Check your email to verify.');
        navigate('/ExpenseTracker');
      } else {
        alert('No user logged in.');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
      setError('Error sending verification email: ' + error.message);
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
        {user && (
          <button onClick={handleSendVerificationEmail} className="verify-email-button">
            Verify Email
          </button>
        )}
        {error && <p className="error-message">{error}</p>}
      </form>
      <button className="signup-button">
        <Link to='/'>Don't have an account? Sign Up</Link>
      </button>
    </div>
  );
};

export default Login;
