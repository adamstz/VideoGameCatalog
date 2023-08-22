package com.example.VideoGameCatalog.Repository;
import com.example.VideoGameCatalog.Model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface GameRepository extends MongoRepository<Game, String> {
    Optional<Game> findByTitle(String title);
}