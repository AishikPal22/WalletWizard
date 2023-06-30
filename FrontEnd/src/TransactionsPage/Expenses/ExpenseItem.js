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

  const saveExpenseHandler = (updatedExpenseData) => {
    const updatedExpense = { ...props.expense, ...updatedExpenseData };
    props.onSaveExpense(updatedExpense);
    console.log(updatedExpense);
    stopEditingHandler();
  };

  const deleteExpenseHandler = () => {
    props.onDeleteExpense(props.expense.id);
  };

  // const updateExpenseHandler = (updatedExpense) => {
  //   props.onSaveExpense(updatedExpense);
  // };
  

  return (
    <li>
      {!isEditing && (
        <div className='expense-item'>
          <ExpenseDate date={props.expense.date} />
          <div className='expense-item__description'>
            <h2>{props.expense.title}</h2>
            <div className='expense-item__price'>₹ {props.expense.amount}</div>
            <div className='expense-item__category'>{props.expense.category}</div>
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



// import React, { useState } from 'react';

// import ExpenseDate from './ExpenseDate';
// import Card from '../UI/Card';
// import './ExpenseItem.css';
// import EditForm from '../EditExpense/EditForm';

// const ExpenseItem = (props) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [expense, setExpense] = useState(props.expense);

//   const startEditingHandler = () => {
//     setIsEditing(true);
//   };

//   const stopEditingHandler = () => {
//     setIsEditing(false);
//   };

//   const saveExpenseHandler = (updatedExpenseData) => {
//     setExpense(updatedExpenseData); // Update the expense state with updated data
//     props.onSaveExpense(updatedExpenseData);
//     stopEditingHandler();
//   };

//   return (
//     <li>
//       {!isEditing && (
//         <Card className='expense-item'>
//           <ExpenseDate date={expense.date} />
//           <div className='expense-item__description'>
//             <h2>{expense.title}</h2>
//             <div className='expense-item__price'>₹ {expense.amount}</div>
//             <div className='expense-item__category'>{expense.category}</div>
//           </div>
//           <div className='expense-item__actions'>
//             <button onClick={startEditingHandler}>Edit</button>
//           </div>
//         </Card>
//       )}
//       {isEditing && (
//         <EditForm
//           expense={expense}
//           onSaveExpense={saveExpenseHandler}
//           onCancel={stopEditingHandler}
//         />
//       )}
//     </li>
//   );
// };

// export default ExpenseItem;




// import React from 'react';

// import ExpenseDate from './ExpenseDate';
// import Card from '../UI/Card';
// import './ExpenseItem.css';

// const ExpenseItem = (props) => {
//   return (
//     <li>
//       <Card className='expense-item'>
//         <ExpenseDate date={props.date} />
//         <div className='expense-item__description'>
//           <h2>{props.title}</h2>
//           <div className='expense-item__price'>₹ {props.amount}</div>
//           <div className='expense-item__category'>{props.category}</div>
//         </div>
//         <div className='expense-item__actions'>
//           <button onClick={props.onEditClick}>Edit</button>
//         </div>
//       </Card>
//     </li>
//   );
// };

// export default ExpenseItem;


// import React from 'react';

// import ExpenseDate from './ExpenseDate';
// import Card from '../UI/Card';
// import './ExpenseItem.css';

// const ExpenseItem = (props) => {
  
//   return (
//     <li>
//       <Card className='expense-item'>
//         <ExpenseDate date={props.date} />
//         <div className='expense-item__description'>
//           <h2>{props.title}</h2>
//           <div className='expense-item__price'>₹ {props.amount}</div>
//           <div className='expense-item__category'>{props.category}</div>
//         </div>
//       </Card>
//     </li>
//   );
// };

// export default ExpenseItem;

// import React, { useState } from 'react';

// const ExpenseItem = (props) => {
//   const [isEditing, setIsEditing] = useState(false);

//   const startEditingHandler = () => {
//     setIsEditing(true);
//   };

//   const stopEditingHandler = () => {
//     setIsEditing(false);
//   };

//   const saveExpenseHandler = (updatedExpenseData) => {
//     // Perform the necessary actions to save the updated expense data
//     // e.g., update the expenses list in the parent component

//     stopEditingHandler();
//   };
  
//   return (
//     <li>
//       {isEditing ? (
//         <ExpenseForm
      
//           expense={props.expense}
//           onSaveExpense={saveExpenseHandler}
//           onCancel={stopEditingHandler}
//         />
//       ) : (
//         <Card className='expense-item'>
//           <ExpenseDate date={props.date} />
//           <div className='expense-item__description'>
//             <h2>{props.title}</h2>
//             <div className='expense-item__price'>₹ {props.amount}</div>
//             <div className='expense-item__category'>{props.category}</div>
//           </div>
//           <button onClick={startEditingHandler}>Edit</button>
//         </Card>
//       )}
//     </li>
//   );
// };

// export default ExpenseItem;