import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Row, Col } from 'react-bootstrap';
//import './NavBar.css';

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
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="w-100">
          <Row noGutters>
            <Col xs={12} sm={6} md={4}>
              <FormControl 
                type="text" 
                placeholder="Search" 
                className="mr-sm-2" 
                value={searchTerm} 
                onChange={handleSearch} 
              />
            </Col>
            <Col xs={12} sm={4} md={3}>
              <Form.Control 
                as="select" 
                value={sortTerm} 
                onChange={handleSort}
                className="mr-sm-2"
              >
                <option value="">Sort by...</option>
                <option value="title">Title</option>
                <option value="rating">Rating</option>
              </Form.Control>
            </Col>
            <Col xs={12} sm={2}>
              <Button variant="outline-success" onClick={onAddGame}>Add Game</Button>
            </Col>
          </Row>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;