package com.example.VideoGameCatalog.Controller;

import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.VideoGameCatalog.config.JwtTokenUtil;
import com.example.VideoGameCatalog.Model.JwtRequest;
import com.example.VideoGameCatalog.Model.JwtResponse;

@RestController  // Indicates that this class is a RESTful web service controller
@CrossOrigin  // Enables cross-origin requests, useful for frontend-backend separation
public class JwtAuthenticationController {

    @Autowired  // Automatically injects the required bean
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService jwtInMemoryUserDetailsService;

    // Endpoint for user authentication and JWT token generation
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> generateAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
            throws Exception {

        // Authenticate the user with the provided credentials
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        // Load user details after successful authentication
        final UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        // Generate JWT token for the authenticated user
        final String token = jwtTokenUtil.generateToken(userDetails);

        // Return the generated JWT token in the response
        return ResponseEntity.ok(new JwtResponse(token));
    }

    // Method to authenticate a user using the AuthenticationManager
    private void authenticate(String username, String password) throws Exception {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
        try {
            // Attempt to authenticate the user with the provided credentials
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            // Handle the case where the user account is disabled
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            // Handle the case where the provided credentials are invalid
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}