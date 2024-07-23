import React from 'react';
import { useSelector } from 'react-redux';
import './ExpensesList.css'; // Import your CSS file

const ExpenseList = ({ expenses = [], onEdit, onDelete }) => {
  // Get dark mode state from Redux store
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`expenses-list ${darkMode ? 'dark-mode' : ''}`}>
      <h2>Daily Expenses</h2>
      {expenses.length > 0 ? (
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              <div className="expense-item">
                <div>
                  <strong>Amount:</strong> ₹{expense.amount.toFixed(2)}
                </div>
                <div>
                  <strong>Description:</strong> {expense.description}
                </div>
                <div>
                  <strong>Category:</strong> {expense.category}
                </div>
                <div className="expense-actions">
                  <button onClick={() => onEdit(expense)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => onDelete(expense.id)} className="delete-button">
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No expenses recorded yet.</p>
      )}
    </div>
  );
};

export default ExpenseList;
