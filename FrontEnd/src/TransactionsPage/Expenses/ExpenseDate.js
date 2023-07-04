import React from 'react';

import '../Styles.css';

const ExpenseDate = (props) => {
  if (!props.date) {
    return null; // Return null or handle the case where date is undefined
  }

  const dateString = props.date; // Assuming props.date is '2023-05-22T00:00:00'
  const dateObject = new Date(dateString);
  const month = dateObject.toLocaleString('en-US', { month: 'long' }); // Months are zero-based, so we add 1
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();


  return (
    <div className='expense-date'>
      <div className='expense-date__month'>{month}</div>
      <div className='expense-date__year'>{year}</div>
      <div className='expense-date__day'>{day}</div>
    </div>
  );
};

export default ExpenseDate;
