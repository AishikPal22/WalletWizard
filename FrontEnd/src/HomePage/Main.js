import React from 'react';
import Chart from './Chart';
import './Main.css';

import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";

const data = [25000.67, 7500.69];


function Main() {
  return (
    <>
      <div>
        <Navbar variant="dark" className="custom-navbar">
          <Nav className="me-auto">
            <NavLink to="/homemain" className="nav nav-link" >WalletWizard.com</NavLink>
          </Nav>
          <Nav className="ms-auto">
            {/* <Nav.Link href="#Categories" >Categories</Nav.Link> */}
            <NavLink to="/categories" className="nav nav-link">Categories</NavLink>
            {/* <Nav.Link href="#Transactions" >Transactions</Nav.Link> */}
            <NavLink to="/transactions" className="nav nav-link">Transactions</NavLink>
            <NavLink to="/" className="nav nav-link">Logout</NavLink>
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
                <h2 className="amount">₹{data[0]}</h2>
              </div>
              <div className='item'>
                <h4 className="label">Total Expense</h4>
                <h2 className="amount">₹{data[1]}</h2>
              </div>
              <div className='item'>
                <h4 className="label">Current Balance</h4>
                <h2 className="amount">₹{data[0] - data[1]}</h2>
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
