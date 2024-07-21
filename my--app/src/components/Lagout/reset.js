// src/components/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { sendResetPasswordEmail } from '../ResetPasswor/passwordResetUtils';
import './ResetPassword.css'; // Import the CSS file

const ResetPassword = () => {
  const [resetEmail, setResetEmail] = useState(''); // State for reset email
  const [resetError, setResetError] = useState('');

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendResetPasswordEmail(resetEmail);
      alert('Password reset email sent! Check your email to reset your password.');
      setResetEmail('');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setResetError('Error sending password reset email: ' + error.message);
    }
  };

  useEffect(() => {
    // Reset error when resetEmail changes
    if (resetEmail) {
      setResetError('');
    }
  }, [resetEmail]);

  return (
    <div>
      <form onSubmit={handlePasswordReset} className="reset-password-form">
        <h2>Forgot Password?</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
        />
        <button type="submit">Reset Password</button>
        {resetError && <p className="error-message">{resetError}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;
