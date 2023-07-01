import React, { useState } from 'react';

import './EditForm.css';

const EditForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState(props.expense.title);
  const [enteredAmount, setEnteredAmount] = useState(props.expense.amount);
  const [enteredCategory, setEnteredCategory] = useState(props.expense.categoryName);
  const [enteredDate, setEnteredDate] = useState(props.expense.date);

  const minDate = '2023-04-01';
  const maxDate = '2024-03-31';
  
  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setEnteredCategory(event.target.value);
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
          {/* <select className='category-select' value={enteredCategory} onChange={categoryChangeHandler}>
            <option value=''>Select Category</option>
            <option value='Income'>Income</option>
            <option value='Expense'>Expense</option>
          </select> */}
          <input
            type='text'
            value={enteredCategory}
            onChange={categoryChangeHandler}
          />
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