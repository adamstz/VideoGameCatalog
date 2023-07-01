import React, { useState, useEffect } from 'react';
import GameList from './GameList';
import NavBar from './NavBar';
import Modal from 'react-modal';
import GameService from './GameService';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Container, Row, Col } from 'react-bootstrap';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [games, setGames] = useState([]);
  const [newGameModalIsOpen, setNewGameModalIsOpen] = useState(false);
  const [newGameTitle, setNewGameTitle] = useState('');
  const [newGameGenre, setNewGameGenre] = useState('');
  const [newGameDeveloper, setNewGameDeveloper] = useState('');
  const [newGameRating, setNewGameRating] = useState('');
  const [newGameNotes, setNewGameNotes] = useState('');
  const [newGameImage, setNewGameImage] = useState('');


  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSort = (type) => {
    setSortType(type);
  };

  const openNewGameModal = () => {
    setNewGameModalIsOpen(true);
  };

  const closeNewGameModal = () => {
    setNewGameModalIsOpen(false);
  };

  const handleNewGameSubmit = (e) => {
    e.preventDefault();
    const newGame = {
      title: newGameTitle,
      genre: newGameGenre,
      developer: newGameDeveloper,
      rating: newGameRating,
      notes: newGameNotes,
      imageUrl: newGameImage
    };
    GameService.createGame(newGame).then(() => {
      GameService.getAllGames().then((response) => {
        setGames(response.data);
      });
      closeNewGameModal();
    });
  };
  const handleGameUpdate = () => {
    GameService.getAllGames().then((response) => {
      setGames(response.data);
    });
  };
  useEffect(() => {
    GameService.getAllGames().then((response) => {
      setGames(response.data);
    });
  }, []);

  

  return (
    <div className="App">
      <Container className="py-4">
        <Row className="justify-content-center">
          <Col>
            <h1 className="display-3 text-center">Game Catalog</h1>
          </Col>
        </Row>
      </Container>
        <NavBar onSearch={handleSearch} onSort={handleSort} onAddGame={openNewGameModal} />
        <GameList searchTerm={searchTerm} sortType={sortType} games={games} onGameUpdate={handleGameUpdate} />
        <Modal
  isOpen={newGameModalIsOpen}
  onRequestClose={closeNewGameModal}
  contentLabel="New Game"
  className="Modal"
  overlayClassName="Overlay"
>
  <h2 className="text-center mb-4">Add New Game</h2>
  <button 
    onClick={closeNewGameModal} 
    className="btn btn-secondary mb-4" 
    style={{float: 'right'}}
  >
    Close
  </button>
  <form>
    <div className="mb-3">
      <label className="form-label">Title</label>
      <input 
        type="text"
        className="form-control"
        placeholder="Title" 
        onChange={e => setNewGameTitle(e.target.value)}
      />
    </div>
    
    <div className="mb-3">
      <label className="form-label">Genre</label>
      <input 
        type="text"
        className="form-control"
        placeholder="Genre" 
        onChange={e => setNewGameGenre(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Developer</label>
      <input 
        type="text"
        className="form-control"
        placeholder="Developer" 
        onChange={e => setNewGameDeveloper(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Rating</label>
      <input 
        type="text"
        className="form-control"
        placeholder="Rating" 
        onChange={e => setNewGameRating(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Notes</label>
      <textarea 
        className="form-control"
        placeholder="Notes" 
        onChange={e => setNewGameNotes(e.target.value)}
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Image URL</label>
      <input 
        type="text"
        className="form-control"
        placeholder="Image URL" 
        onChange={e => setNewGameImage(e.target.value)}
      />
    </div>

    <button type="submit" className="btn btn-primary" onClick={handleNewGameSubmit}>
      Submit
    </button>
  </form>
</Modal>

    </div>
  );
}

export default App;