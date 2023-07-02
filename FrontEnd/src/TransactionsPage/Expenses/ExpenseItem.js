import React, { useState } from 'react';

import ExpenseDate from './ExpenseDate';
import './ExpenseItem.css';
import EditForm from '../EditExpense/EditForm';

const ExpenseItem = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const saveExpenseHandler = (updatedExpense) => {
    const updatedExpenseData = { ...props.expense, ...updatedExpense };
    props.onSaveExpense(updatedExpenseData);
    console.log(updatedExpenseData);
    stopEditingHandler();
  };

  const deleteExpenseHandler = () => {
    props.onDeleteExpense(props.expense.id);
  };

  console.log(props);
  

  return (
    <li>
      {!isEditing && (
        <div className='expense-item'>
          <ExpenseDate date={props.expense.date} />
          <div className='expense-item__description'>
            <h2>{props.expense.title}</h2>
            <div className='expense-item__price'>₹ {props.expense.amount}</div>
            <div className='expense-item__category'>{props.expense.categoryName}</div>
            <div className='expense-item__type'>{props.expense.categoryType}</div>
          </div>
          <div className='expense-item__actions'>
            <button className='expense-item__edit' onClick={startEditingHandler}>Edit</button>
          </div>
          <div className='expense-item__actions'>
            <button className='expense-item__delete' onClick={deleteExpenseHandler}>Delete</button>
          </div>
        </div>
      )}
      {isEditing && (
        <EditForm
          expense={props.expense}
          onSaveExpense={saveExpenseHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </li>
  );
};

export default ExpenseItem;