import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove, update } from 'firebase/database';
import './expenses.css'; // Import your CSS file
import database from './firebase'; // Import the database instance
import ExpenseList from './ExpensesList'; // Import the new ExpenseList component

const Expenses = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenseList, setExpenseList] = useState([]); // Ensure this is initialized as an array
  const [editingExpense, setEditingExpense] = useState(null);

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
      timestamp: Date.now(),
    };

    try {
      if (editingExpense) {
        await update(ref(database, `expenses/${editingExpense.id}`), newExpense);
        setEditingExpense(null);
      } else {
        await push(ref(database, 'expenses/'), newExpense);
      }
      alert('Expense submitted successfully!');
      setAmount('');
      setDescription('');
      setCategory('Food');
    } catch (error) {
      alert('Error submitting expense:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await remove(ref(database, `expenses/${id}`));
      alert('Expense deleted successfully!');
    } catch (error) {
      alert('Error deleting expense:', error.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
  };

  // Calculate the total amount spent
  const totalAmount = expenseList.reduce((total, expense) => total + expense.amount, 0);

  return (
    <div className="expenses-container">
      <h1>{editingExpense ? 'Edit Your Expense' : 'Enter Your Expense'}</h1>
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
        
        <button type="submit" className="submit-button">
          {editingExpense ? 'Update' : 'Submit'}
        </button>
      </form>

      <ExpenseList
        expenses={expenseList}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <div className="total-spent">
        <h2>Total Spent</h2>
        <p>₹{totalAmount.toFixed(2)}</p>
        {totalAmount > 10000 && (
          <button className="activate-premium-button">Activate Premium</button>
        )}
      </div>
    </div>
  );
};

export default Expenses;
