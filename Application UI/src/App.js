import React from 'react';
// import UserMain from './UsersPage/Main';
import HomeMain from './HomePage/Main';
import Login from './UsersPage/Login';
import Register from './UsersPage/Register';
import Categories from './CategoriesPage/Main';
import Transactions from "./TransactionsPage/Main";
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<UserMain />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/homemain" element={<HomeMain />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Router>
  )
}
export default App;