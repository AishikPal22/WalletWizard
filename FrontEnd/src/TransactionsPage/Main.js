import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

import NewExpense from './NewExpense/NewExpense';
import Expenses from './Expenses/Expenses';
import "bootstrap/dist/css/bootstrap.min.css";
import '../HomePage/Main.css';


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
        window.location.reload();
      })
      .catch(error => {
        // Handle the error here
        console.error('Error adding expense:', error);
      });
      // console.log(response.data);
  };


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
        window.location.reload();
      })
      .catch(error => {
        console.error('Error updating expense:', error);
        console.log(updatedExpenseData.id);
      });
  };


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
  

  return (
    <>
      <div>
        <Navbar variant="dark" className="custom-navbar">
          <Nav className="me-auto">
            <NavLink to="/homemain" className="nav nav-link custom-link" >Home</NavLink>
          </Nav>
          <Nav className="ms-auto">
            <NavLink to="/categories" className="nav nav-link custom-link">Categories</NavLink>
            <NavLink to="/transactions" className="nav nav-link custom-link">Transactions</NavLink>
            <Button variant="link" className="nav-link custom-link" onClick={handleLogoutConfirmation}>Logout</Button>
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