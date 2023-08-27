import React, { useState, useEffect } from 'react';
import { Navbar, Form, FormControl, Button, Row } from 'react-bootstrap';
import './NavBar.css';
import Modal from 'react-modal';
import AuthService from './AuthService';


async function fetchCurrentUser() {
  const token = localStorage.getItem('token'); // Assuming you store the JWT token in local storage
  const response = await fetch('/api/user/current', {
      headers: {
          'Authorization': `Bearer ${token}`
      }
  });
  if (response.ok) {
      const user = await response.json();
      // Now you have the user details
      console.log(user);
  } else {
      console.error('Failed to fetch user details');
  }
}

function NavigationBar({ onSearch, onSort, onAddGame }) {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortTerm, setSortTerm] = useState('');
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);

  
  useEffect(() => {
    async function getCurrentUser() {
        const username = await AuthService.fetchCurrentUser();
        if (username) {
            setLoggedInUser(username);
        }
    }
    getCurrentUser();
}, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSortTerm(e.target.value);
    onSort(e.target.value);
  };

  const openSignInModal = () => {
    setSignInModalIsOpen(true);
  };
  
  const closeSignInModal = () => {
    setSignInModalIsOpen(false);
  };
  const handleLoginClick = async (e) => {
    e.preventDefault();
    const data = await AuthService.login(username, password);
    if (data && data.token) {
        setLoggedInUser(username);
        closeSignInModal();
    } else {
        console.error("Failed to login");
    }
};
const handleLogout = () => {
  AuthService.logout();  // Assuming you have a logout function in your AuthService
  setLoggedInUser(null);
};

  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="w-100 d-flex justify-content-center"> 
          <div className="d-flex">
            <FormControl 
                type="text" 
                placeholder="Search"
                className="search-input"
                value={searchTerm} 
                onChange={handleSearch} 
            />
            <Form.Control 
                as="select" 
                className="sort-select"
                value={sortTerm} 
                onChange={handleSort}
              >
                <option value="">Sort by...</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
              </Form.Control>
              <Button 
                className="add-game-btn"
                variant="outline-success" 
                onClick={onAddGame} 
            >
                Add Game
            </Button>
          </div>
          
        </Form>
        
        {loggedInUser ? (
    <div>
        <span>Welcome, {loggedInUser}!</span>
        <Button
            className="Logout-btn"
            variant="outline-danger"
            onClick={handleLogout}
        >
            Logout
        </Button>
    </div>
) : (
    <Button
        className="Sign-in-btn"
        variant="outline-success"
        onClick={openSignInModal}
    >
        Sign In
    </Button>
)}
      </Navbar.Collapse>
      <Modal
  isOpen={signInModalIsOpen}
  onRequestClose={closeSignInModal}
  contentLabel="Sign In"
  className="Modal"
  overlayClassName="Overlay"
>
  <h2 className="text-center mb-4">Sign In</h2>
  
  <button 
    onClick={closeSignInModal} 
    className="btn btn-secondary mb-4" 
    style={{float: 'right'}}
  >
    Close
  </button>
  
  <form>
    <div className="mb-3">
      <label htmlFor="username" className="form-label">Username:</label>
      <input 
        type="text" 
        id="username"
        className="form-control"
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
    
    <div className="mb-3">
      <label htmlFor="password" className="form-label">Password:</label>
      <input 
        type="password" 
        id="password"
        className="form-control"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    
    <button 
      type="button"
      className="btn btn-primary"
      onClick={handleLoginClick}
    >
      Sign In
    </button>
  </form>
</Modal>
    </Navbar>
    
  );
}

export default NavigationBar;