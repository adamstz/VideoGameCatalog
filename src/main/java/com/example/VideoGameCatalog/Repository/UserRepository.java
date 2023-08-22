package com.example.VideoGameCatalog.Repository;
import com.example.VideoGameCatalog.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;
public interface UserRepository extends MongoRepository<User, String> {
}