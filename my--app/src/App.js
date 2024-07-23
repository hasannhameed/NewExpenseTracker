// src/App.js
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import store from './Store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage/SignUp';
import LoginPage from './components/LoginPage/Login';
import ExpenseTrackerPage from './components/ExpenseTrackerPage/ExpenseTrackerPage';
import UserprofilePage from './components/UserProfilePage/UserprofilePage';
import ResetPassword from './components/ResetPasswor/reset';
import ProtectedRoute from './privateRouter/PrivateRouteProtectedRoute'; // Import the ProtectedRoute component
import './App.css';

const ThemedApp = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Router>
        <Routes>
          <Route path="/" element={<SignUpPage />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ExpenseTracker" element={<ProtectedRoute element={<ExpenseTrackerPage />} />} />
          <Route path="/UserProfile" element={<ProtectedRoute element={<UserprofilePage />} />} />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;
