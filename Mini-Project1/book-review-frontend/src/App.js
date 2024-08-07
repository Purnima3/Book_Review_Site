import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Review_Page from './components/Review_Page';
import Home_Page from './components/LandingPage/Home_Page';
import SignUp from './components/signup/SignUp';
import Login from './components/login/Login';
import Dashboard_admin from './components/Dashboard/Dashboard_admin';
import Dashboard_cust from './components/Dashboard/Dashboard_cust';

function App() {
  return (
    <div>
       <Router>
      <Routes>
        <Route path="/" element={< Home_Page/>} />
        <Route path="/review" element={<Review_Page />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin-dashboard" element={<Dashboard_admin />} />
        <Route path="/customer-dashboard" element={<Dashboard_cust />} />
      </Routes>
    </Router>
    </div>
  )
}

export default App

