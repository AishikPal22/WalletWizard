import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './EditForm.css';

const EditForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState(props.expense.title);
  const [enteredAmount, setEnteredAmount] = useState(props.expense.amount);
  const [enteredCategory, setEnteredCategory] = useState(props.expense.categoryName);
  const [enteredDate, setEnteredDate] = useState(props.expense.date);

  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('usertoken');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get('https://localhost:7145/api/Categories', { headers });
        setCategoryOptions(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const minDate = '2023-04-01';
  const maxDate = '2024-03-31';
  
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  // const categoryChangeHandler = (event) => {
  //   setEnteredCategory(event.target.value);
  // };

  const dropdownChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
    console.log(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (!enteredCategory|| enteredCategory === '') {
      return;
    }

    const expenseData = {
      id: props.expense.id,
      title: enteredTitle,
      amount: enteredAmount,
      categoryName: enteredCategory,
      date: new Date(enteredDate),
    };

    props.onSaveExpense(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredCategory('');
    setEnteredDate('');
  };

  const cancelHandler = () => {
    props.onCancel();
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='edit__controls'>
        <div className='edit__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='edit__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='edit__control'>
          <label>Date</label>
          <input
            type='date'
            min={minDate}
            max={maxDate}
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
        <div className='edit__control'>
          <label>Category</label>
          <select className="category-select" value={enteredCategory} onChange={dropdownChangeHandler}>
            <option value="">Select Category</option>
            {categoryOptions.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='edit__actions'>
        <button type="button" onClick={cancelHandler}>Cancel</button>
        <button type='submit'>Done</button>
      </div>
    </form>
  );
};

export default EditForm;