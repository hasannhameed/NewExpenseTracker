// src/components/UserProfilePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from './firebase'; // Ensure correct paths
import { updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './UPP.css';

const UserProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        setFullName(user.displayName || '');
        setPhotoUrl(user.photoURL || '');
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      alert('No user is currently logged in.');
      return;
    }

    try {
      // Update the user's profile in Firebase Authentication
      await updateProfile(currentUser, {
        displayName: fullName,
        photoURL: photoUrl
      });

      // Save the updated user details in Firestore
      await setDoc(doc(db, 'users', currentUser.uid), {
        fullName: fullName,
        photoUrl: photoUrl
      });

      alert('Profile updated successfully!');
      setFullName('');
      setPhotoUrl('');
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Error updating profile. Please try again.');
    }
  };

  return (
    <div className="user-profile-page">
      <nav className="nav-container">
        <p className="nav-title"><strong>Winner never quit, Quitter never wins!!!</strong></p>
        <p className="navv-profile">
          <strong>Your profile is 64% completed. A complete profile has a<br /> higher chance of landing a job.</strong>
          <Link to="/UserProfile">Complete Now</Link>
        </p>
      </nav>
      <div className="contact-details">
        <div className="header-container">
          <h2>Contact Details</h2>
          <button className="cancel-button"><strong>Cancel</strong></button>
        </div>
        <form onSubmit={handleUpdate} className="input-container">
          <label><i className="fab fa-github"></i><strong> Full Name</strong></label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          <label><i className="fas fa-globe"></i><strong> Profile Photo Url</strong></label>
          <input
            type="text"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <button type="submit" className="update-button">Update</button>
        </form>
        <hr />
      </div>
    </div>
  );
};

export default UserProfilePage;
