package com.example.VideoGameCatalog;
import com.example.VideoGameCatalog.Model.Game;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.example.VideoGameCatalog.Repository.GameRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class VideoGameCatalogApplication {

	public static void main(String[] args) {

		SpringApplication.run(VideoGameCatalogApplication.class, args);
	}
	@Bean
	CommandLineRunner commandLineRunner(GameRepository gameRepository) {
			return args -> {
				Game game = new Game();
				game.setTitle("Super Mario Odyssey");
				game.setGenre("Platform");
				game.setDeveloper("Nintendo");
				game.setImageUrl("https://clipart-library.com/images/pcqKR4EEi.jpg");
				game.setRating(9.6);
				game.setNotes("Sample Note");
				gameRepository.save(game);
				System.out.println("Sample game has been inserted successfully.");
			};


	}
}
