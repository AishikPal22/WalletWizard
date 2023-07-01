import React, { useEffect, useState } from 'react';

import NewExpense from './NewExpense/NewExpense';
import Expenses from './Expenses/Expenses';

import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '../HomePage/Main.css';
import axios from 'axios';

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
//     date: new Date(2024, 2, 12),
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

const App = () => {
  const t=localStorage.getItem('usertoken');
  const [expenses, setExpenses] = useState([]);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7145/api/Transactions/SortByDate', {
          headers: {
            'Authorization': `Bearer ${t}`
          }
        });
        console.log(response.data);
        setExpenses(response.data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchData();
  }, [t]);

  // const addExpenseHandler = (expense) => {
  //   setExpenses((prevExpenses) => {
  //     return [expense, ...prevExpenses];
  //   });
  // };

  const addExpenseHandler = (expense) => {
    const headers = {
      'Authorization': `Bearer ${t}`
    };

    axios.post('https://localhost:7145/api/Transactions', expense, { headers })
      .then(response => {
        console.log('Expense added:', response.data);
        setExpenses((prevExpenses) => {
          return [expense, ...prevExpenses];
        });
      })
      .catch(error => {
        // Handle the error here
        console.error('Error adding expense:', error);
      });
      // console.log(response.data);
  };

  // const updateExpenseHandler = (updatedExpense) => {
  //   setExpenses((prevExpenses) => {
  //     const updatedExpenses = prevExpenses.map((expense) => {
  //       if (expense.id === updatedExpense.id) {
  //         return {
  //           ...expense,
  //           ...updatedExpense,
  //         };
  //       }
  //       return expense;
  //     });
  //     console.log(updatedExpenses);
  //     return updatedExpenses;
  //   });
  // };

  const updateExpenseHandler = (updatedExpenseData) => {
   const headers = {
      'Authorization': `Bearer ${t}`
    };
    console.log(updatedExpenseData);
    axios.put(`https://localhost:7145/api/Transactions/${updatedExpenseData.id}`, updatedExpenseData, { headers })
      .then(response => {
        setExpenses((prevExpenses) => {
          const updatedExpenses = prevExpenses.map((expense) => {
            if (expense.id === updatedExpenseData.id) {
              return {
                ...expense,
                ...updatedExpenseData,
              };
            }
            return expense;
          });
          return updatedExpenses;
        });
      })
      .catch(error => {
        console.error('Error updating expense:', error);
        console.log(updatedExpenseData.id);
      });
  };

  // const deleteExpenseHandler = (expenseId) => {
  //   setExpenses((prevExpenses) => {
  //     const updatedExpenses = prevExpenses.filter(
  //       (expense) => expense.id !== expenseId
  //     );
  //     return updatedExpenses;
  //   });
  // };

  const deleteExpenseHandler = (expenseId) => {
    axios.delete(`https://localhost:7145/api/Transactions/${expenseId}`, {
      headers: {
        'Authorization': `Bearer ${t}`
      }
    })
      .then((response) => {
        setExpenses((prevExpenses) => {
          const updatedExpenses = prevExpenses.filter(
            (expense) => expense.id !== expenseId
            );
            return updatedExpenses;
          });
        })
        .catch((error) => {
          console.error('Error deleting expense:', error);
        });
        // console.log(response.data);
  };

  const handleLogout = () => {
    // Clear the token from localStorage or wherever it is stored
    localStorage.removeItem('usertoken');
    setShowLogoutModal(false);
    // window.location.reload();
    // Redirect the user to the login or home page
    navigate('/');
  };

  const handleLogoutConfirmation = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
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
            {/* <NavLink to="/" className="nav nav-link custom-link" onClick={logoutHandler}>Logout</NavLink> */}
            <Nav.Link onClick={handleLogoutConfirmation}>Logout</Nav.Link>
          </Nav>
        </Navbar>
      </div>
      <Modal show={showLogoutModal} onHide={handleLogoutCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Logout Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleLogoutCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
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