import React, { useEffect, useState } from 'react';

import NewCategory from './NewCategory/NewCategory';
import Categories from './Categories/Categories';

import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { Modal, Button } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import '../HomePage/Main.css';
import axios from 'axios';

// const DUMMY_CATEGORIES = [
//   {
//     id: 1,
//     title: 'Salary',
//     type: 'Income',
//   },
//   {
//     id: 2,
//     title: 'Sales',
//     type: 'Income',
//   },
//   {
//     id: 3,
//     title: 'Shopping',
//     type: 'Expense',
//   },
//   {
//     id: 4,
//     title: 'Dining',
//     type: 'Expense',
//   },
//   {
//     id: 5,
//     title: 'Travelling',
//     type: 'Expense',
//   },
// ];

const App = () => {
  const t = localStorage.getItem('usertoken');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7145/api/Categories', {
          headers: {
            'Authorization': `Bearer ${t}`
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchData();
  }, [t]);

  console.log(t);
  console.log(categories);

  const addCategoryHandler = (category) => {
    const headers = {
      'Authorization': `Bearer ${t}`
    };

    axios.post('https://localhost:7145/api/Categories', category, { headers })
      .then(response => {
        console.log('Category added:', response.data);
        setCategories((prevCategories) => {
          return [category, ...prevCategories];
        });
      })
      .catch(error => {
        // Handle the error here
        console.error('Error adding category:', error);
      });
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
        <Navbar variant="dark" className="custom-navbar" >
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
        <NewCategory onAddCategory={addCategoryHandler} />
        <Categories items={categories} />
      </div>
    </>
  );
};

export default App;
// style={{ backgroundColor: '#3f3f3f' }}