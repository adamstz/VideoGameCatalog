package com.example.VideoGameCatalog.services;

import com.example.VideoGameCatalog.Model.User;
import com.example.VideoGameCatalog.Model.Game;
import com.example.VideoGameCatalog.Repository.UserRepository;
import com.example.VideoGameCatalog.Repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
// The @Service annotation is used to indicate that the class provides some sort of business functionality.
@Service
public class UserService {
    // The @Autowired annotation tells Spring to inject the GameRepository bean into this class.
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GameRepository gameRepository;
    public void addGameToFavorites(String userId, String gameId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getFavoriteGames() == null) {
            user.setFavoriteGames(new ArrayList<>());
        }
        if(!user.getFavoriteGames().contains(gameId)) {
            user.getFavoriteGames().add(gameId);
            userRepository.save(user);
        }
    }

    public void removeGameFromFavorites(String userId, String gameId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getFavoriteGames() != null && user.getFavoriteGames().contains(gameId)) {
            user.getFavoriteGames().remove(gameId);
            userRepository.save(user);
        }
    }

    public List<Game> getFavoriteGamesForUser(String userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if(user.getFavoriteGames() != null) {
            return gameRepository.findAllById(user.getFavoriteGames());
        }
        return new ArrayList<>();
    }
}