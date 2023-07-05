import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom"
import Navbar from 'react-bootstrap/Navbar';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import NewCategory from './NewCategory/NewCategory';
import Categories from './Categories/Categories';

import '../HomePage/Main.css';
import "bootstrap/dist/css/bootstrap.min.css";

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

  const handleHome = () => {
    navigate("/homemain");
  }

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
        <Navbar variant="dark" className="custom-navbar" >
          <Nav className="me-auto">
            {/* <NavLink to="/homemain" className="nav nav-link custom-link" >Home</NavLink> */}
            <Button className="btn btn-outline-light" style={{
              background: 'transparent',
              fontFamily: 'sans-serif',
              padding: '0.5rem 0.5rem',
              fontSize: '1.5rem',
              color: 'white'
            }} onClick={handleHome}><FontAwesomeIcon icon={faHome} style={{ marginRight: '0.5rem' }} />
              Home</Button>
          </Nav>
          <Nav className="ms-auto">
            <NavLink to="/categories" className="nav nav-link custom-link">Categories</NavLink>
            <NavLink to="/transactions" className="nav nav-link custom-link">Transactions</NavLink>
            <Button className="btn btn-outline-light" style={{
              background: 'transparent',
              fontFamily: 'sans-serif',
              padding: '0.5rem 0.5rem',
              fontSize: '1.5rem',
              color: 'white'
            }} onClick={handleLogoutConfirmation}><FontAwesomeIcon icon={faPowerOff} style={{ marginRight: '0.5rem' }} />
              Logout</Button>
          </Nav>
        </Navbar>
      </div>
      <Modal show={showLogoutModal} onHide={handleLogoutCancel}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to log out?</Modal.Title>
        </Modal.Header> */}
        <Modal.Body style={{fontFamily:'sans-serif'}}>Are you sure you want to log out?</Modal.Body>
        <Modal.Footer  style={{fontFamily:'sans-serif'}}>
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