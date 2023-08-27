package com.example.VideoGameCatalog;
import com.example.VideoGameCatalog.Model.Game;
import com.example.VideoGameCatalog.Model.User;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.VideoGameCatalog.Repository.GameRepository;
import com.example.VideoGameCatalog.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import java.util.Optional;

@SpringBootApplication
public class VideoGameCatalogApplication {

	public static void main(String[] args) {

		SpringApplication.run(VideoGameCatalogApplication.class, args);
	}
	//
	@Bean
	CommandLineRunner commandLineRunner(GameRepository gameRepository, UserRepository userRepository) {
		return args -> {
			createGameIfNotExists(gameRepository, "Super Mario Odyssey", "Platform", "Nintendo", "https://clipart-library.com/images/pcqKR4EEi.jpg", 9.6, "Sample Note");
			createGameIfNotExists(gameRepository, "God of War", "Action-adventure", "Santa Monica Studio", "https://wallpapers.com/images/featured-full/god-of-war-83rush6v76r4v0ul.jpg", 9.8, "Sample Note");
			createGameIfNotExists(gameRepository, "Final Fantasy VII Remake", "RPG", "Square Enix", "https://upload.wikimedia.org/wikipedia/en/c/ce/FFVIIRemake.png", 8.9, "Sample Note");
			createUserIfNotExists(userRepository, "test","test");
			System.out.println("Sample games have been inserted successfully.");
		};
	}

	void createGameIfNotExists(GameRepository gameRepository, String title, String genre, String developer, String imageUrl, double rating, String notes) {
		Optional<Game> optionalGame = gameRepository.findByTitle(title);
		if (!optionalGame.isPresent()) {
			Game game = new Game();
			game.setTitle(title);
			game.setGenre(genre);
			game.setDeveloper(developer);
			game.setImageUrl(imageUrl);
			game.setRating(rating);
			game.setNotes(notes);
			gameRepository.save(game);
		}
	}
	private void createUserIfNotExists(UserRepository userRepository, String username, String password) {
		if (userRepository.findByUsername(username) == null) {
			User user = new User();
			user.setUsername(username);
			user.setPassword(password);
			userRepository.save(user);
		}
	}
}
