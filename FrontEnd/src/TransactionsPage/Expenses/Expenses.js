import React, { useState, useEffect } from 'react';

import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesBarChart from '../Chart/ExpensesBarChart';
import './Expenses.css';

const Expenses = (props) => {
  const [filteredMonth, setFilteredMonth] = useState('');

  const filterChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };

  useEffect(() => {
    setFilteredMonth('');
  }, [props.items]);

  const filteredExpenses = props.items.filter((expense) => {
    if (filteredMonth === '') {
      return true;
    } else {
      const dateObject = new Date(expense.date);
      const month = dateObject.toLocaleString('en-US', { month: 'long' });
      return month === filteredMonth;
    }
  });

  const updateExpenseHandler = (updatedExpense) => {
    const updatedExpenses = props.items.map((expense) => {
      console.log(expense);
      if (expense.id === updatedExpense.id) {
        return {
          ...expense,
          ...updatedExpense,
        };
      }
      console.log(updatedExpense);
      console.log(expense);
      return expense;
    });
  
    console.log(updatedExpenses);
    props.onUpdateExpense(updatedExpense);
  };

  const deleteExpenseHandler = (expenseId) => {
    props.onDeleteExpense(expenseId);
  };
  

  return (
    <div>
      <div className='expenses'>
        {/* <div className='graph-container'>
          <ExpensesSplineChart expenses={props.items} />
        </div> */}
        <div className='graph-container'>
          <ExpensesBarChart expenses={props.items} />
        </div>
        <ExpensesFilter
          selected={filteredMonth}
          onChangeFilter={filterChangeHandler}
        />
        <ExpensesList
          items={filteredExpenses}
          onSaveExpense={updateExpenseHandler}
          onDeleteExpense={deleteExpenseHandler}
        />
      </div>
    </div>
  );
};

export default Expenses;

