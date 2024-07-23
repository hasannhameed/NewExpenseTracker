// src/components/Login.js
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { authAction } from "../../Store/authSlice";
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
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
      const bearerToken = await loggedInUser.getIdToken();
      dispatch(authAction.login({ userId: loggedInUser.uid, bearerToken })); // Dispatch login action with userId and bearerToken
      alert('User logged in successfully!');
      navigate('/ExpenseTracker');
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
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Link to='/'>New user? Sign Up</Link>
        <button type="submit">Login</button>
        <Link to='/reset-password'>Reset Password</Link> {/* Link to the reset password page */}
        {user && (
          <button onClick={handleSendVerificationEmail} className="verify-email-button">
            Verify Email
          </button>
        )}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
