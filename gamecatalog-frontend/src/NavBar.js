import React, { useState, useEffect } from 'react';
import { Navbar, Form, FormControl, Button, Row } from 'react-bootstrap';
import './NavBar.css';
import Modal from 'react-modal';
import AuthService from './AuthService';



function NavBar({ onSearch, onSort, onAddGame, loggedInUser, onUserLogin, onToggleFavorites}) {

  const [searchTerm, setSearchTerm] = useState('');
  const [sortTerm, setSortTerm] = useState('');
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  
  const handleFavoritesToggle = (e) => {
    setShowFavorites(e.target.checked);
    onToggleFavorites(e.target.checked); // Notify parent component
  };


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
        onUserLogin(username);
        closeSignInModal();
    } else {
        console.error("Failed to login");
    }
};
const handleLogout = () => {
  AuthService.logout();  // Assuming you have a logout function in your AuthService
  onUserLogin(null);
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
        {loggedInUser && (
              <div className="ml-3 d-flex align-items-center">
                <input 
                  type="checkbox" 
                  id="favoritesCheckbox" 
                  checked={showFavorites} 
                  onChange={handleFavoritesToggle}
                />
                <label htmlFor="favoritesCheckbox" className="ml-2">Favorites</label>
              </div>
            )}
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

export default NavBar;