import React, { useState } from 'react';
import NewExpense from './NewExpense/NewExpense';
import Expenses from './Expenses/Expenses';

import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import '../HomePage/Main.css';

const DUMMY_EXPENSES = [
  {
    id: 1,
    title: 'Toilet Paper',
    category: 'Expense',
    amount: 94.12,
    date: new Date(2023, 7, 14),
  },
  {
    id: 2,
    title: 'New TV',
    category: 'Expense',
    amount: 799.49,
    date: new Date(2024, 2, 12),
  },
  {
    id: 3,
    title: 'Salary',
    category: 'Income',
    amount: 3294.67,
    date: new Date(2024, 2, 28),
  },
  {
    id: 4,
    title: 'New Desk (Wooden)',
    category: 'Expense',
    amount: 450,
    date: new Date(2023, 5, 12),
  },
];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const updateExpenseHandler = (updatedExpense) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.map((expense) => {
        if (expense.id === updatedExpense.id) {
          return {
            ...expense,
            ...updatedExpense,
          };
        }
        return expense;
      });
      console.log(updatedExpenses);
      return updatedExpenses;
    });
  };

  const deleteExpenseHandler = (expenseId) => {
    setExpenses((prevExpenses) => {
      const updatedExpenses = prevExpenses.filter(
        (expense) => expense.id !== expenseId
      );
      return updatedExpenses;
    });
  };
  

  // const updateExpenseHandler = (updatedExpense) => {
  //   setExpenses((prevExpenses) => {
  //     const updatedExpenses = prevExpenses.map((expense) => {
  //       if (expense.id === updatedExpense.id) {
  //         return updatedExpense;
  //       }
  //       return expense;
  //     });
  //     return updatedExpenses;
  //   });
  // };

  return (
    <>
      <div>
        <Navbar variant="dark" className="custom-navbar">
          <Nav className="me-auto">
            {/* <Nav.Link href="#Home" >WalletWizard.com</Nav.Link> */}
            <NavLink to="/homemain" className="nav nav-link custom-link" >WalletWizard.com</NavLink>
          </Nav>
          <Nav className="ms-auto">
            {/* <Nav.Link href="#Categories" >Categories</Nav.Link> */}
            <NavLink to="/categories" className="nav nav-link custom-link">Categories</NavLink>
            {/* <Nav.Link href="#Transactions" >Transactions</Nav.Link> */}
            <NavLink to="/transactions" className="nav nav-link custom-link">Transactions</NavLink>
            {/* <Nav.Link href="#Logout" >Logout</Nav.Link> */}
            <NavLink to="/" className="nav nav-link custom-link">Logout</NavLink>
          </Nav>
        </Navbar>
      </div>
      <div>
        <style>{'body { background-color: #3f3f3f; }'}</style>
        <NewExpense onAddExpense={addExpenseHandler} />
        <Expenses items={expenses} onUpdateExpense={updateExpenseHandler} onDeleteExpense={deleteExpenseHandler}/>      
      </div>
    </>
  );
};

export default App;

// import React, { useState } from 'react';
// import NewExpense from './components/NewExpense/NewExpense';
// import Expenses from './components/Expenses/Expenses';

// const DUMMY_EXPENSES = [
//   {
//     id: 1,
//     title: 'Toilet Paper',
//     category: 'Expense',
//     amount: 94.12,
//     date: new Date(2023, 7, 14),
//   },
//   { 
//     id: 2, 
//     title: 'New TV', 
//     category: 'Expense',
//     amount: 799.49, 
//     date: new Date(2024, 2, 12) 
//   },
//   {
//     id: 3,
//     title: 'Salary',
//     category: 'Income',
//     amount: 3294.67,
//     date: new Date(2024, 2, 28),
//   },
//   {
//     id: 4,
//     title: 'New Desk (Wooden)',
//     category: 'Expense',
//     amount: 450,
//     date: new Date(2023, 5, 12),
//   },
// ];

// const App = () => {
//   const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
//   console.log(expenses);

//   const addExpenseHandler = (expense) => {
//     setExpenses((prevExpenses) => {
//       return [expense, ...prevExpenses];
//     });
//   };

//   const updateExpenseHandler = (updatedExpense) => {
//     setExpenses((prevExpenses) => {
//       const updatedExpenses = prevExpenses.map((expense) => {
//         if (expense.id === updatedExpense.id) {
//           return updatedExpense;
//         }
//         return expense;
//       });
//       return updatedExpenses;
//     });
//   };
  
//   return (
//     <div>
//       <NewExpense onAddExpense={addExpenseHandler} />
//       <Expenses items={expenses} onUpdateExpense={updateExpenseHandler}/>
//     </div>
//   );
// };

// export default App;