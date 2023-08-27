package com.example.VideoGameCatalog.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.VideoGameCatalog.filter.JwtRequestFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration  // Indicates that this class contains beans to be managed by Spring
public class SecurityConfig {

    @Autowired  // Automatically injects the required bean
    private JwtRequestFilter jwtAuthenticationFilter;

    @Bean  // Exposes the method return value as a bean in the Spring context
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors(cors-> corsConfigurationSource()).csrf(csrf->csrf.disable())

                .authorizeHttpRequests((authz) -> authz
                        .requestMatchers("/authenticate").permitAll()  // Allow unauthenticated access to the authentication endpoint
                        .requestMatchers("/favorites/**").authenticated()  // Require authentication for any URL starting with /favorites/
                        .anyRequest().permitAll()  // All other URLs are accessible without authentication
                )
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .httpBasic(withDefaults())
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);  // Add your JWT authentication filter to the HttpSecurity configuration

        // If CSRF protection is deprecated, consider using an alternative or ensure it's safe to disable it in your context
        // http.csrf().disable();

        return http.build();  // Builds the HttpSecurity configuration
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));  // Allow specific origins
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));  // Allow specific HTTP methods
        configuration.setAllowedHeaders(Arrays.asList("*"));  // Allow all headers
        configuration.setAllowCredentials(true);  // Allow credentials

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);  // Apply CORS configuration to all endpoints

        return source;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}