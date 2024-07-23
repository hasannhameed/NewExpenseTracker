import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Function to toggle dark mode
const toggleDarkMode = () => {
  const currentTheme = localStorage.getItem('theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', newTheme);
  document.body.className = newTheme === 'dark' ? 'dark-mode' : '';
};

// Check local storage for the preferred theme and apply it
const preferredTheme = localStorage.getItem('theme');
if (preferredTheme === 'dark') {
  document.body.className = 'dark-mode';
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App toggleDarkMode={toggleDarkMode} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
