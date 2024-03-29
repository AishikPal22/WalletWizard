import React from 'react';

import ExpenseItem from './ExpenseItem';
import '../Styles.css';

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h3 className='expenses-list__fallback'>Found no expenses.</h3>;
  }

  const saveExpenseHandler = (updatedExpense) => {
    console.log(updatedExpense);
    props.onSaveExpense(updatedExpense);
  };

  return (
    <ul className='expenses-list'>
      {props.items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense} 
          onSaveExpense={saveExpenseHandler}
          onDeleteExpense={props.onDeleteExpense}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;

