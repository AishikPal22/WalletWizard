import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Modal, Button } from 'react-bootstrap';

import Chart from './Chart';
import './Main.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Main() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('usertoken');

    const headers = {
      'Authorization': `Bearer ${token}`
    };

    axios.get('https://localhost:7145/api/Home/CurrentBalance', { headers })
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching CurrentBalance:', error);
      });
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage or wherever it is stored
    localStorage.removeItem('usertoken');
    setShowLogoutModal(false);
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
            <NavLink to="/homemain" className="nav nav-link  custom-link" >WalletWizard.com</NavLink>
          </Nav>
          <Nav className="ms-auto">
            <NavLink to="/categories" className="nav nav-link  custom-link">Categories</NavLink>
            <NavLink to="/transactions" className="nav nav-link  custom-link">Transactions</NavLink>
            <Button variant="link" className="nav-link custom-link" onClick={handleLogoutConfirmation} outline>Logout</Button>
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
      <style>{'body { background-color: #3f3f3f; }'}</style>
      <div className='main_row'>
        <div className="data-container">
          <div className='row'>
            <div>
              <h1 className='label'>Account Status:</h1>
              <div className='item'>
                <h4 className="label">Total Income</h4>
                <h2 className="amount">₹{data.totalIncome}</h2>
              </div>
              <div className='item'>
                <h4 className="label">Total Expense</h4>
                <h2 className="amount">₹{data.totalExpense}</h2>
              </div>
              <div className='item'>
                <h4 className="label">Current Balance</h4>
                <h2 className="amount">₹{data.totalIncome - data.totalExpense}</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-container">
          <Chart items={data} />
        </div>
      </div>
    </>
  );
}

export default Main;
