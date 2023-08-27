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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.VideoGameCatalog.config.JwtTokenUtil;
import com.example.VideoGameCatalog.Model.JwtRequest;
import com.example.VideoGameCatalog.Model.JwtResponse;

@CrossOrigin(origins = "http://localhost:3000")
@RestController  // Indicates that this class is a RESTful web service controller
public class JwtAuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService jwtInMemoryUserDetailsService;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> generateAuthenticationToken(@RequestBody JwtRequest authenticationRequest)
            throws Exception {

        logger.info("Authentication request received for username: {}", authenticationRequest.getUsername());

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        logger.info("Authentication successful for username: {}", authenticationRequest.getUsername());

        final UserDetails userDetails = jwtInMemoryUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        logger.info("Generated JWT token for username: {}", authenticationRequest.getUsername());

        return ResponseEntity.ok(new JwtResponse(token));
    }

    private void authenticate(String username, String password) throws Exception {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            logger.error("User account is disabled for username: {}", username, e);
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            logger.error("Invalid credentials provided for username: {}", username, e);
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }
}