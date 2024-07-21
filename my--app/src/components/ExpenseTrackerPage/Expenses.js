import React, { useState } from 'react';
import './expenses.css'; // Import your CSS file

const Expenses = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenseList, setExpenseList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new expense object with amount as a number
    const newExpense = {
      amount: parseFloat(amount), // Convert amount to a number
      description,
      category,
      id: Date.now() // Unique id for the expense
    };

    // Update the expense list
    setExpenseList([...expenseList, newExpense]);

    // Clear form fields
    setAmount('');
    setDescription('');
    setCategory('Food');

    alert('Expense submitted successfully!');
  };

  // Calculate the total amount spent
  const totalAmount = expenseList.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="expenses-container">
      <h1>Enter Your Expense</h1>
      <form onSubmit={handleSubmit} className="expenses-form">
        <label htmlFor="amount">Money Spent</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
        
        <label htmlFor="description">Description</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          required
        />
        
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Utilities">Utilities</option>
        </select>
        
        <button type="submit" className="submit-button">Submit</button>
      </form>

      <div className="expenses-list">
        <h2>Daily Expenses</h2>
        {expenseList.length > 0 ? (
          <ul>
            {expenseList.map(expense => (
              <li key={expense.id}>
                <strong>Amount:</strong> ${expense.amount.toFixed(2)} | 
                <strong> Description:</strong> {expense.description} | 
                <strong> Category:</strong> {expense.category}
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses recorded yet.</p>
        )}
      </div>

      <div className="total-spent">
        <h2>Total Spent</h2>
        <p>${totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Expenses;
