package com.example.VideoGameCatalog.Controller;

import com.example.VideoGameCatalog.Model.Game;
import com.example.VideoGameCatalog.Model.User;
import com.example.VideoGameCatalog.Repository.GameRepository;
import com.example.VideoGameCatalog.Repository.UserRepository;
import org.springframework.web.bind.annotation.*;
import java.util.NoSuchElementException;
import java.util.List;

@RestController
@RequestMapping("/api/games")
@CrossOrigin(origins = "http://localhost:3000")
public class GameController {

    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    public GameController(GameRepository gameRepository, UserRepository userRepository) {
        this.gameRepository = gameRepository;
        this.userRepository = userRepository;
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
    public Game updateGame(@PathVariable String id, @RequestBody Game gameDetails) {
        Game game = gameRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Game not found with id " + id));

        if (gameDetails.getTitle() != null) {
            game.setTitle(gameDetails.getTitle());
        }

        if (gameDetails.getDeveloper() != null) {
            game.setDeveloper(gameDetails.getDeveloper());
        }

        if (gameDetails.getGenre() != null) {
            game.setGenre(gameDetails.getGenre());
        }

        if (gameDetails.getImageUrl() != null) {
            game.setImageUrl(gameDetails.getImageUrl());
        }

        if (gameDetails.getRating() != null) {
            game.setRating(gameDetails.getRating());
        }

        if (gameDetails.getNotes() != null) {
            game.setNotes(gameDetails.getNotes());
        }

        Game updatedGame = gameRepository.save(game);
        return updatedGame;
    }

}