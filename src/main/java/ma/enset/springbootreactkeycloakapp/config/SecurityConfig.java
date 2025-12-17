package ma.enset.springbootreactkeycloakapp.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {
        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                                .csrf(csrf -> csrf.disable())
                                .cors(Customizer.withDefaults()) // <-- important
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/public/**").permitAll()
                                                .anyRequest().authenticated())
                                .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
                return http.build();
        }

        @Bean
        CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration config = new CorsConfiguration();
                // Origine de ton front
                config.setAllowedOrigins(List.of("http://localhost:5173"));
                // Méthodes autorisées
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                // Headers autorisés (inclure Authorization !)
                config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
                // Si tu as besoin d'envoyer des cookies (souvent false ici)
                config.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                // Appliquer cette config à tous les endpoints
                source.registerCorsConfiguration("/**", config);
                return source;
        }
}
