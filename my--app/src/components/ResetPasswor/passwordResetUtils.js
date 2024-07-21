// src/passwordResetUtils.js
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

export const sendResetPasswordEmail = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new Error(error.message);
  }
};
