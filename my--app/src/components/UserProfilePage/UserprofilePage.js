import React from 'react'
import { Link } from 'react-router-dom'
import './UPP.css' // Import your CSS file here

const UserprofilePage = () => {
  return (
    <div className="user-profile-page">
      <nav className="nav-container">
        <p className="nav-title">Winner never quit, Quitter never wins!!!</p>
        <p className="nav-profile">
          Your profile is 64% completed. A complete profile has a higher chance of landing a job.
          <br />
          <Link to="/UserProfile">Complete Now</Link>
        </p>
      </nav>
      <div className="contact-details">
        <div className="header-container">
          <h2>Contact Details</h2>
          <button className="cancel-button">Cancel</button>
        </div>
        <div className="input-container">
          <label>Full Name</label>
          <input type="text" />
          <label>Profile Photo Url</label>
          <input type="text" />
          <button className="update-button">Update</button>
        </div>
        <hr />
      </div>
    </div>
  )
}

export default UserprofilePage
