import React, { useEffect, useState, onGameUpdate} from 'react';
import Modal from 'react-modal';
import "./GameList.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import GameService from './GameService';
Modal.setAppElement('#root')

function GameList({ searchTerm, sortType,games = [], setGames, onGameUpdate, loggedInUser, showOnlyFavorites }) {
 
  //const [games, setGames] = useState([]);
  const [modalIsOpen,setIsOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [newRating, setNewRating] = useState("");
  const [newNotes, setNewNotes] = useState("");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (e, gameId) => {
    e.stopPropagation(); // Prevent triggering the game's onClick

    if (favorites.includes(gameId)) {
      removeFavorite(gameId);
    } else {
      addFavorite(gameId);
    }
  };
  
  useEffect(() => {
    if (showOnlyFavorites) {
        GameService.getFavorite().then((response) => {
            setGames(response);
        });
    } else {
        GameService.getAllGames().then((response) => {
            setGames(response);
        });
    }
    
}, [showOnlyFavorites]);


  const addFavorite = (gameId) => {
    GameService.addFavorite(gameId)
      .then(() => {
        setFavorites([...favorites, gameId]);
      })
      .catch(error => {
        console.error("Failed to add favorite:", error);
      });
  }

  const removeFavorite = (gameId) => {
    GameService.removeFavorite(gameId)
      .then(() => {
        setFavorites(favorites.filter(id => id !== gameId));
      })
      .catch(error => {
        console.error("Failed to remove favorite:", error);
      });
  }
  function openModal(game) {
    setCurrentGame(game);
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

  function handleUpdate(e) {
    e.preventDefault(); 
    const updatedFields = {};
    if (newRating) updatedFields.rating = newRating;
    if (newNotes) updatedFields.notes = newNotes;

    GameService.updateGame(currentGame.id, updatedFields).then(() => {
      onGameUpdate();
      closeModal();
    });
  }

  
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
      <div key={game.id} className="game-container" onClick={() => openModal(game)}> 
        <img 
          src={game.imageUrl} 
          alt="Game" 
          className="game-image"
           
        />
       <h2>
  {game.title} 
  {loggedInUser && (
    <span 
      className={favorites.includes(game.id) ? "star favorited" : "star"}
      onClick={(e) => toggleFavorite(e, game.id)}
    >
      ★
    </span>
  )}
</h2>
        <p>Genre: {game.genre}</p>
        <p>Developer: {game.developer}</p>
        <p>Rating: {game.rating}</p>
        <p>Notes: {game.notes}</p>
      </div>
    ))}
     <Modal
  isOpen={modalIsOpen}
  onRequestClose={closeModal}
  contentLabel="Update Game"
  className="Modal"
  overlayClassName="Overlay"
>
  <h2 className="text-center mb-4">{currentGame?.title}</h2>

  <button 
    onClick={closeModal} 
    className="btn btn-secondary mb-4" 
    style={{float: 'right'}}
  >
    Close
  </button>

  <form>
    <div className="mb-3">
      <label htmlFor="rating" className="form-label">Rating:</label>
      <input 
        type="text" 
        id="rating"
        className="form-control"
        value={newRating} 
        onChange={e => setNewRating(e.target.value)} 
      />
    </div>

    <div className="mb-3">
      <label htmlFor="notes" className="form-label">Notes:</label>
      <textarea 
        id="notes"
        className="form-control"
        value={newNotes} 
        onChange={e => setNewNotes(e.target.value)} 
      />
    </div>

    <button 
      type="button" 
      onClick={handleUpdate}
      className="btn btn-primary"
    >
      Update
    </button>
  </form>
</Modal>
  </div>
  );
}

export default GameList;