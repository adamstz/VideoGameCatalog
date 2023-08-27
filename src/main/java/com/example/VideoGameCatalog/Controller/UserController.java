package com.example.VideoGameCatalog.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/user")
public class UserController {

    @GetMapping("/current")
    public ResponseEntity<Map<String, String>> getCurrentUser(Authentication authentication) {
        Object principal = authentication.getPrincipal();

        if (principal instanceof org.springframework.security.core.userdetails.User) {
            org.springframework.security.core.userdetails.User springUser = (org.springframework.security.core.userdetails.User) principal;
            String username = springUser.getUsername();

            // Create a map to hold the username
            Map<String, String> response = new HashMap<>();
            response.put("username", username);

            return ResponseEntity.ok(response);
        } else {
            // Handle other types of principal objects or errors
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid user type");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        }
    }
}