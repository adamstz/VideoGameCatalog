package com.example.VideoGameCatalog.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "users")
public class User {

    @Id
    private String id; // MongoDB typically uses String for the ID
    private String username;
    private String password;

    private List<String> favoriteGames;

    // Constructors, getters, setters, and any other methods you need...

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    public List<String> getFavoriteGames() {
        return favoriteGames;
    }
    public void setFavoriteGames(List<String> favoriteGames) {
        this.favoriteGames = favoriteGames;
    }

    // ... any other methods you need
}