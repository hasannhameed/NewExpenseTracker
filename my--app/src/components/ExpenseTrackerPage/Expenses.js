import React, { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import './expenses.css'; // Import your CSS file
import database from './firebase'; // Import the database instance

const Expenses = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenseList, setExpenseList] = useState([]);

  useEffect(() => {
    const expensesRef = ref(database, 'expenses/');
    onValue(expensesRef, (snapshot) => {
      const data = snapshot.val();
      const expenses = [];
      for (let id in data) {
        expenses.push({ id, ...data[id] });
      }
      setExpenseList(expenses);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newExpense = {
      amount: parseFloat(amount),
      description,
      category,
      timestamp: Date.now()
    };

    try {
      await push(ref(database, 'expenses/'), newExpense);
      alert('Expense submitted successfully!');
      setAmount('');
      setDescription('');
      setCategory('Food');
    } catch (error) {
      alert('Error submitting expense:', error.message);
    }
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
                <strong>Amount:</strong> ₹{expense.amount.toFixed(2)} | 
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
        <p>₹{totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Expenses;
