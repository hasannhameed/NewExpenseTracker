import React from 'react'
import { Link } from 'react-router-dom'
import './ETP.css' // Import your CSS file here

const ExpenseTrackerPage = () => {
  return (
    <div className="expense-tracker-page">
      <nav className="nav-container">
        <p className="nav-title">Welcome to the ExpenseTracker!!!</p>
        <p className="nav-profile">
          Your profile is incomplete 
          <Link to="/UserProfile"> Complete Now</Link>
        </p>
      </nav>
      <hr />
    </div>
  )
}

export default ExpenseTrackerPage
