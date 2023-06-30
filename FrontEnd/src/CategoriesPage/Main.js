import React, { useEffect, useState } from 'react';

import NewCategory from './NewCategory/NewCategory';
import Categories from './Categories/Categories';

import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import '../HomePage/Main.css';
import axios from 'axios'

const DUMMY_CATEGORIES = [
  {
    id: 1,
    title: 'Salary',
    type: 'Income',
  },
  {
    id: 2,
    title: 'Sales',
    type: 'Income',
  },
  {
    id: 3,
    title: 'Shopping',
    type: 'Expense',
  },
  {
    id: 4,
    title: 'Dining',
    type: 'Expense',
  },
  {
    id: 5,
    title: 'Travelling',
    type: 'Expense',
  },
];

const App = () => {
  const [categories, setCategories] = useState([]);
  const t=localStorage.getItem('usertoken');
  useEffect(()=>{
    const ab= axios.get(`https://localhost:7145/api/Categories`,{
      headers:{
        'Authorization':`Bearer ${t}`
      }
    });
    setCategories(ab);
    console.log(ab);
  });
  

  const addCategoryHandler = (category) => {
    setCategories((prevCategories) => {
      return [category, ...prevCategories];
    });
  };

  return (
    <>
      <div>
        <Navbar variant="dark" className="custom-navbar" >
          <Nav className="me-auto">
            {/* <Nav.Link href="#Home" >WalletWizard.com</Nav.Link> */}
            <NavLink to="/homemain" className="nav nav-link" >WalletWizard.com</NavLink>
          </Nav>
          <Nav className="ms-auto">
            {/* <Nav.Link href="#Categories" >Categories</Nav.Link> */}
            <NavLink to="/categories" className="nav nav-link">Categories</NavLink>
            {/* <Nav.Link href="#Transactions" >Transactions</Nav.Link> */}
            <NavLink to="/transactions" className="nav nav-link">Transactions</NavLink>
            {/* <Nav.Link href="#Logout" >Logout</Nav.Link> */}
            <NavLink to="/" className="nav nav-link">Logout</NavLink>
          </Nav>
        </Navbar>
      </div>
      <div>
        <style>{'body { background-color: #3f3f3f; }'}</style>
        <NewCategory onAddCategory={addCategoryHandler} />
        <Categories items={categories} />
      </div>
    </>
  );
};

export default App;
// style={{ backgroundColor: '#3f3f3f' }}