import React, { useState } from 'react';
import { Navbar, Form, FormControl, Button, Row } from 'react-bootstrap';
import './NavBar.css';
function NavigationBar({ onSearch, onSort, onAddGame }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortTerm, setSortTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSortTerm(e.target.value);
    onSort(e.target.value);
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
        
          <Button
              className="Sign-in-btn"
              variant="outline-success"
          >
              Sign In
          </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;