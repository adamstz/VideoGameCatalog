import React, { useEffect, useState } from 'react';
import GameService from './GameService';
import Modal from 'react-modal';
import "./GameList.css";

Modal.setAppElement('#root')

function GameList({ searchTerm, sortType }) {
  const [games, setGames] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [newRating, setNewRating] = useState("");
  const [newNotes, setNewNotes] = useState("");

  function openModal(game) {
    setCurrentGame(game);
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function handleUpdate() {
    const updatedFields = { rating: newRating, notes: newNotes };
    GameService.updateGame(currentGame.id, updatedFields)
      .then(() => {
        // After the game is updated and the modal is closed, refresh the game list.
        GameService.getAllGames().then((response) => {
          setGames(response.data);
        });
      });
    closeModal();
  }

  useEffect(() => {
    GameService.getAllGames().then((response) => {
      setGames(response.data);
    });
  }, []);

  let filteredGames = games;

  if (searchTerm) {
    filteredGames = filteredGames.filter((game) => 
      game.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  filteredGames.sort((a, b) => {
    if (sortType === 'title') {
      return a.title.localeCompare(b.title); // Alphabetical sorting
    } else if (sortType === 'rating') {
      return b.rating - a.rating; // Descending sorting by rating
    } else {
      return 0; // No sorting
    }
  });

  return (
    <div className="grid-container">
    {filteredGames.map((game) => (
      <div key={game.id} className="game-container">
        <img 
          src={game.imageUrl} 
          alt="Game" 
          className="game-image"
          onClick={() => openModal(game)} // Registering click event to open modal
        />
        <h2>{game.title}</h2>
        <p>Genre: {game.genre}</p>
        <p>Developer: {game.developer}</p>
        <p>Rating: {game.rating}</p>
        <p>Notes: {game.notes}</p>
      </div>
    ))}
     <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>{currentGame?.title}</h2>
        <button onClick={closeModal}>close</button>
        <form>
          <label>
            Rating:
            <input type="text" value={newRating} onChange={e => setNewRating(e.target.value)} />
          </label>
          <label>
            Notes:
            <input type="text" value={newNotes} onChange={e => setNewNotes(e.target.value)} />
          </label>
          <button onClick={handleUpdate}>Update</button>
        </form>
      </Modal>
  </div>
  );
}

export default GameList;