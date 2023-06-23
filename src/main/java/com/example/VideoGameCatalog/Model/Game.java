package com.example.VideoGameCatalog;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "games")
public class Game {
    @Id
    private String id;
    private String title;
    private String genre;
    private String developer;

}
