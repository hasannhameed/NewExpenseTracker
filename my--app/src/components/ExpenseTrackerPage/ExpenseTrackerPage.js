import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../Lagoutbutton/lagoutbutton'
import './ETP.css' // Import your CSS file here
import Expenses from './Expenses'

const ExpenseTrackerPage = () => {
  return (
    <div className="expense-tracker-page">
      <nav className="nav-container">
        <p className="nav-title"><strong>Welcome to the ExpenseTracker!!!</strong></p>
        <p className="nav-profile">
          <strong>Your profile is incomplete </strong>
          <Link to="/UserProfile"> Complete Now</Link>
        </p>
          <LogoutButton />
      </nav>
      <hr />
      <Expenses/>
    </div>
  )
}

export default ExpenseTrackerPage
