package com.example.VideoGameCatalog.Controller;

import com.example.VideoGameCatalog.Model.Game;
import com.example.VideoGameCatalog.Repository.GameRepository;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;
import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    private final GameRepository gameRepository;

    public GameController(GameRepository gameRepository) {
        this.gameRepository = gameRepository;
    }

    @GetMapping
    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    @PostMapping
    public Game createGame(@RequestBody Game game) {
        return gameRepository.save(game);
    }
    @PutMapping("/{id}")
    public Game updateGame(@PathVariable Long id, @RequestBody Game gameDetails) {
        Game game = gameRepository.findById(String.valueOf(id)).orElseThrow(() -> new NoSuchElementException("Game not found with id " + id));

        game.setTitle(gameDetails.getTitle());
        game.setDeveloper(gameDetails.getDeveloper());
        game.setGenre(gameDetails.getGenre());
        game.setImageUrl(gameDetails.getImageUrl());
        game.setRating(gameDetails.getRating());
        game.setNotes(gameDetails.getNotes());

        Game updatedGame = gameRepository.save(game);
        return updatedGame;
    }

}