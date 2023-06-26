import React, { useState } from 'react';
import GameList from './GameList';
import Navbar from './NavBar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState(''); // new
  const [filterType, setFilterType] = useState(''); // new

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (type) => { // new
    setSortType(type);
  };

  const handleFilter = (type) => { // new
    setFilterType(type);
  };

  return (
    <div className="App">
      <h1>Game Catalog</h1>
      <Navbar onSearch={handleSearch} onSort={handleSort} onFilter={handleFilter} /> {/* updated */}
      <GameList searchTerm={searchTerm} sortType={sortType} filterType={filterType} /> {/* updated */}
    </div>
  );
}

export default App;