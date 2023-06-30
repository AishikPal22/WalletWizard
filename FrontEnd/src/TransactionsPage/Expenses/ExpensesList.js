import React from 'react';

import ExpenseItem from './ExpenseItem';
import './ExpensesList.css';

const ExpensesList = (props) => {
  if (props.items.length === 0) {
    return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
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
          // title={expense.title}
          // category={expense.category}
          // amount={expense.amount}
          // date={expense.date}
          // onEditClick={() => props.onStartEditing(expense)}
          expense={expense} // Pass the entire expense object as prop
          // onStartEditing={props.onStartEditing}
          // onSaveExpense={props.onSaveExpense}
          onSaveExpense={saveExpenseHandler}
          onDeleteExpense={props.onDeleteExpense}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;



// import React from 'react';

// import ExpenseItem from './ExpenseItem';
// import './ExpensesList.css';

// const ExpensesList = (props) => {
//   if (props.items.length === 0) {
//     return <h2 className='expenses-list__fallback'>Found no expenses.</h2>;
//   }
//   console.log(props);

//   return (
//     <ul className='expenses-list'>
//       {props.items.map((expense) => (
//         <ExpenseItem
//           key={expense.id}
//           title={expense.title}
//           category={expense.category}
//           amount={expense.amount}
//           date={expense.date}
//           onSaveExpense={props.onSaveExpense} //for edited expense
//         />
//       ))}
//     </ul>
//   );
// };

// export default ExpensesList;
