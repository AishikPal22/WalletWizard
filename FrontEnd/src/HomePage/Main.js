import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from './Chart';
import './Main.css';

import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

function Main() {
  const [data, setData] = useState([]);

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
  
  return (
    <>
      <div>
        <Navbar variant="dark" className="custom-navbar">
          <Nav className="me-auto">
            <NavLink to="/homemain" className="nav nav-link  custom-link" >WalletWizard.com</NavLink>
          </Nav>
          <Nav className="ms-auto">
            {/* <Nav.Link href="#Categories" >Categories</Nav.Link> */}
            <NavLink to="/categories" className="nav nav-link  custom-link">Categories</NavLink>
            {/* <Nav.Link href="#Transactions" >Transactions</Nav.Link> */}
            <NavLink to="/transactions" className="nav nav-link  custom-link">Transactions</NavLink>
            <NavLink to="/" className="nav nav-link  custom-link">Logout</NavLink>
          </Nav>
        </Navbar>
      </div>
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
