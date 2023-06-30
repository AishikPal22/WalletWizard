import React, { useState } from 'react';

import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredCategory, setEnteredCategory] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  // eslint-disable-next-line
  //const currentYear = new Date().getFullYear();
  const minDate = '2023-04-01';
  const maxDate = '2024-03-31';

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

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
      title: enteredTitle,
      amount: enteredAmount,
      category: enteredCategory,
      date: new Date(enteredDate),
    };
    //console.log(expenseData);

    props.onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredCategory('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className='new-expense__controls'>
        <div className='new-expense__control'>
          <label>Title</label>
          <input
            type='text'
            value={enteredTitle}
            onChange={titleChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Amount</label>
          <input
            type='number'
            min='0.01'
            step='0.01'
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Date</label>
          <input
            type='date'
            min={minDate}
            max={maxDate}
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
        <div className='new-expense__control'>
          <label>Category</label>
          <select className='category-select' value={enteredCategory} onChange={dropdownChangeHandler}>
            <option value=''>Select Category</option>
            <option value='Income'>Income</option>
            <option value='Expense'>Expense</option>
          </select>
        </div>
      </div>
      <div className='new-expense__actions'>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type='submit'>Add</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
