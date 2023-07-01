import React, { useState } from 'react';

import ExpenseForm from './ExpenseForm';
import './NewExpense.css';

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  // const [lastUsedId, setLastUsedId] = useState(10);

  const saveExpenseDataHandler = (enteredExpenseData) => {
    // const newId = lastUsedId + 1;
    const expenseData = {
      ...enteredExpenseData,
      // id: newId,
    };
    props.onAddExpense(expenseData);
    console.log(expenseData);
    // setLastUsedId(newId);
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className='new-expense'>
      {!isEditing && (
        <button onClick={startEditingHandler}>Add New Expense</button>
      )}
      {isEditing && (
        <ExpenseForm
          onSaveExpenseData={saveExpenseDataHandler}
          onCancel={stopEditingHandler}
        />
      )}
    </div>
  );
};

export default NewExpense;
