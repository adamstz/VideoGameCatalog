package com.example.VideoGameCatalog.Controller;

import com.example.VideoGameCatalog.services.UserService;
import com.example.VideoGameCatalog.Model.User;
import com.example.VideoGameCatalog.Model.Game;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/current")
    public ResponseEntity<Map<String, String>> getCurrentUser(Authentication authentication) {
        String username = extractUsernameFromAuthentication(authentication);
        Map<String, String> response = new HashMap<>();
        response.put("username", username);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/addFavorite")
    public ResponseEntity<?> addFavoriteGame(Authentication authentication, @RequestBody Map<String, String> requestMap) {
        String username = extractUsernameFromAuthentication(authentication);
        if (username == null) {
            System.out.println("Username is null after extraction");
        } else {
            System.out.println("Extracted username: " + username);
        }
        String gameId = requestMap.get("gameId");

        User updatedUser = userService.addGameToFavorites(username, gameId);

        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add game to favorites.");
        }
    }

    @GetMapping("/getFavorites")
    public ResponseEntity<?> getFavoriteGames(Authentication authentication) {
        String username = extractUsernameFromAuthentication(authentication);

        try {
            List<Game> favoriteGames = userService.getFavoriteGamesForUser(username);
            return ResponseEntity.ok(favoriteGames);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found or no favorite games available.");
        }
    }

    @DeleteMapping("/removeFavorite")
    public ResponseEntity<?> removeFavoriteGame(Authentication authentication, @RequestBody Map<String, String> requestMap) {
        String username = extractUsernameFromAuthentication(authentication);
        String gameId = requestMap.get("gameId");

        try {
            userService.removeGameFromFavorites(username, gameId);
            return ResponseEntity.ok("Game removed from favorites successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to remove game from favorites.");
        }
    }

    private String extractUsernameFromAuthentication(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof UserDetails)) {
            throw new RuntimeException("User is not authenticated");
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }
}