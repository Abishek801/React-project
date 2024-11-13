import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LoginPage from './Loginpage';
import BloodDonationForm from './BloodDonationForm';
import Home from './Home'; 
import About from './About';
import Contact from './Contact';
import Profile from './Profile';
import Footer from './Footer';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Arial, sans-serif';
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-around;
  background-color: #ff4d4d;
  padding: 15px 0;
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;

  &:hover {
    color: #ffcccc;
  }
`;

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // Function to update authentication state
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // Set document title based on route
  useEffect(() => {
    const updateTitle = () => {
      if (isAuthenticated) {
        document.title = "Blood Donation - Application";
      } else {
        document.title = "Blood Donation - Login";
      }
    };
    updateTitle();
  }, [isAuthenticated]);

  return (
    <Router>
      <PageContainer>
        <Navbar>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          {isAuthenticated ? (
            <>
              <NavItem to="/application">Application</NavItem>
              <NavItem to="/profile">Profile</NavItem>
              <NavItem to="/" onClick={handleLogout}>Logout</NavItem>
            </>
          ) : (
            <NavItem to="/login">Login</NavItem>
          )}
        </Navbar>
        {isLoading && <div>Loading...</div>} {/* Loading indicator */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route
            path="/application"
            element={isAuthenticated ? <BloodDonationForm /> : <Navigate to="/login" replace />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" replace />} />
        </Routes>
        <Footer />
      </PageContainer>
    </Router>
  );
};

export default App;
