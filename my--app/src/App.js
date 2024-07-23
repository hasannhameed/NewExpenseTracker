import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpPage from './components/SignUpPage/SignUp';
import LoginPage from './components/LoginPage/Login';
import ExpenseTrackerPage from './components/ExpenseTrackerPage/ExpenseTrackerPage';
import UserprofilePage from './components/UserProfilePage/UserprofilePage';
import ResetPassword from './components/ResetPasswor/reset';
import './App.css';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/ExpenseTracker" element={<ExpenseTrackerPage/>} />
        <Route path="/UserProfile" element={<UserprofilePage/>} />
        {/* Add more routes here */}
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
