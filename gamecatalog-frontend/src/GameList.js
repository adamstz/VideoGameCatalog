import React, { useEffect, useState } from 'react';
import GameService from './GameService';

function GameList() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        GameService.getAllGames().then((response) => {
            setGames(response.data);
        });
    }, []);

    return (
        <div style={{display: 'flex', flexWrap: 'wrap'}}>
            {games.map((game) => (
                <div key={game.id} style={{width: '30%', margin: '1em', border: '1px solid black', padding: '1em'}}>
                    <img src={game.png} alt="Game" width="100%" height="auto"/>
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