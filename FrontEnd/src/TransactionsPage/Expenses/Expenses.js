import React, { useState, useEffect } from 'react';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';
import ExpensesSplineChart from '../Chart/ExpensesSplineChart';
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
      // return (
      //   expense.date.toLocaleString('en-US', { month: 'long' }) === filteredMonth
      // );
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
  

  // const updateExpenseHandler = (updatedExpense) => {
  //   const updatedExpenses = props.items.map((expense) => {
  //     if (expense.id === updatedExpense.id) {
  //       return updatedExpense;
  //     }
  //     return expense;
  //   });
    
  //   console.log(updatedExpenses);
  //   props.onUpdateExpense(updatedExpenses);
  // };

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


// import React, { useState } from 'react';

// import Card from '../UI/Card';
// import ExpensesFilter from './ExpensesFilter';
// import ExpensesList from './ExpensesList';
// import ExpensesChart from './ExpensesChart';
// import EditForm from '../EditExpense/EditForm';
// import './Expenses.css';

// const Expenses = (props) => {
//   const [filteredMonth, setFilteredMonth] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedExpense, setEditedExpense] = useState(null);

//   const filterChangeHandler = (selectedMonth) => {
//     setFilteredMonth(selectedMonth);
//   };

//   const filteredExpenses = props.items.filter((expense) => {
//     if (filteredMonth === '') {
//       return props.items;
//     } else {
//       return (
//         expense.date.toLocaleString('en-US', { month: 'long' }) ===
//         filteredMonth
//       );
//     }
//   });

//   const startEditingHandler = (expense) => {
//     setIsEditing(true);
//     setEditedExpense(expense);
//   };

//   const stopEditingHandler = () => {
//     setIsEditing(false);
//     setEditedExpense(null);
//   };

//   const saveExpenseHandler = (updatedExpense) => {
//     props.onUpdateExpense(updatedExpense);
//     stopEditingHandler();
//   };

//   return (
//     <div>
//       <Card className='expenses'>
//         <div className='chart-container'>
//           <ExpensesChart expenses={props.items} />
//         </div>
//         <ExpensesFilter
//           selected={filteredMonth}
//           onChangeFilter={filterChangeHandler}
//         />
//         {isEditing && (
//           <EditForm
//           expense={editedExpense}
//           onSaveExpense={saveExpenseHandler}
//           onCancel={stopEditingHandler}
//         />
//         )}
//         {!isEditing && (
//           <ExpensesList
//           items={filteredExpenses}
//           onStartEditing={startEditingHandler}
//           onSaveExpense={saveExpenseHandler} // Pass the onSaveExpense function
//         />
//         )}
//       </Card>
//     </div>
//   );
// };

// export default Expenses;


// import React, {useState} from 'react';

// import Card from '../UI/Card';
// import ExpensesFilter from './ExpensesFilter';
// import ExpensesList from './ExpensesList';
// import ExpensesChart from './ExpensesChart';
// import EditForm from '../EditExpense/EditForm';
// import './Expenses.css';

// const Expenses = (props) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedExpense, setEditedExpense] = useState(null);
//   //const [editExpenseId, setEditExpenseId] = useState(null); //added
  
//   const startEditingHandler = (expense) => {
//     setIsEditing(true);
//     setEditedExpense(expense);
//   };  

//   const stopEditingHandler = () => {
//     setIsEditing(false);
//     setEditedExpense(null);
//   };

//   const saveExpenseHandler = (updatedExpense) => {
//     props.onUpdateExpense(updatedExpense);
//     stopEditingHandler();
//   };
  
//   const [filteredMonth, setFilteredMonth] = useState('');

//   const filterChangeHandler = (selectedMonth) => {
//     setFilteredMonth(selectedMonth);
//   };

//   const filteredExpenses = props.items.filter((expense) => {
//     if (filteredMonth === '')
//       return props.items;
//     else
//       return expense.date.toLocaleString('en-US', { month: 'long' }) === filteredMonth;
//   });

//   return (
//     <div>
//       <Card className='expenses'>
//         <div className='chart-container'>
//           <ExpensesChart expenses={props.items} />
//         </div>
//         <ExpensesFilter
//           selected={filteredMonth}
//           onChangeFilter={filterChangeHandler}
//         />
//         {isEditing && (
//           <EditForm
//             expense={editedExpense}
//             onSaveExpense={saveExpenseHandler}
//             onCancel={stopEditingHandler}
//           />
//         )}
//         {!isEditing && (
//           <ExpensesList
//             items={filteredExpenses}
//             onStartEditing={startEditingHandler}
//           />
//         )}
//       </Card>
//     </div>
//   );
// };

// export default Expenses;



    // <div>
    //   <div>
    //   <Card className='expenses'>
    //   <div className="chart-container">
    //     <ExpensesChart expenses={props.items} />
    //   </div>
    //     <ExpensesFilter
    //       selected={filteredMonth}
    //       onChangeFilter={filterChangeHandler}
    //     />
    //     <ExpensesList items={filteredExpenses} onSaveExpense={saveExpenseHandler}/>
    //   </Card>
    //   </div>
    // </div>
