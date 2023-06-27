import React, { useState } from 'react';
import './NavBar.css'; 

function Navbar({ onSearch, onSort }) {
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
    <nav className = "navbar">
      <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch} />
      <select value={sortTerm} onChange={handleSort}>
        <option value="">Sort by...</option>
        <option value="title">Title</option>
        <option value="rating">Rating</option>
      </select>
    </nav>
  );
}

export default Navbar;