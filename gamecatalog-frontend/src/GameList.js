import React, { useEffect, useState } from 'react';
import GameService from './GameService';

function GameList({ searchTerm, sortType }) {
  const [games, setGames] = useState([]);

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
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {filteredGames.map((game) => (
        <div key={game.id} style={{width: '30%', margin: '1em', border: '1px solid black', padding: '1em'}}>
          <img src={game.imageUrl} alt="Game" width="100%" height="auto"/>
          <h2>{game.title}</h2>
          <p>Genre: {game.genre}</p>
          <p>Developer: {game.developer}</p>
          <p>Rating: {game.rating}</p>
          <p>Notes: {game.notes}</p>
        </div>
      ))}
    </div>
  );
}

export default GameList;