package com.example.VideoGameCatalog.Repository;
import com.example.VideoGameCatalog.Model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
public interface GameRepository extends MongoRepository<Game, String> {
}