package com.thesis2.EunoiaProject.Security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.CorsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    @Autowired
    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // 1) Enable cors in HttpSecurity
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // 👈 Ensure CORS applies
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/login/**", "/api/register/**").permitAll()
                        .requestMatchers(HttpMethod.PUT, "/api/users/**").authenticated()
                        .requestMatchers("/api/professionals/recommended").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/posts/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/posts/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/posts/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/posts/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/comments/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/comments/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/comments/**").authenticated()
                        .requestMatchers(HttpMethod.DELETE, "/api/comments/**").authenticated()
                        // .requestMatchers("/api/comments/**").authenticated()
                        .requestMatchers(HttpMethod.GET,"/api/professionals/{id}/availability").permitAll()
                        .requestMatchers(HttpMethod.POST,"/api/pre-assessment/submit").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/professionals/**").authenticated()
                        .requestMatchers("/api/bookings/user").authenticated()
                        .requestMatchers("/api/bookings/professional").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/bookings/admin").hasAuthority("ADMIN")
                        .requestMatchers("/api/bookings/**").authenticated()
                       // .requestMatchers(HttpMethod.POST, "/api/login/professional").hasAuthority("PROFESSIONAL")
                        .requestMatchers(HttpMethod.GET, "/api/admin/users/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/professionals/add").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/professionals/**").hasAuthority("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/professionals/**").permitAll()
                        .anyRequest().authenticated()
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // 2) Provide a CorsConfigurationSource bean to define allowed origins/methods/headers
    @Bean
    public org.springframework.web.cors.CorsConfigurationSource corsConfigurationSource() {
        org.springframework.web.cors.CorsConfiguration config = new org.springframework.web.cors.CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(List.of("https://eunoia.social"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type", "Accept"));
        config.setExposedHeaders(List.of("Authorization")); // 👈 Expose JWT tokens
        config.setAllowCredentials(true);

        org.springframework.web.cors.UrlBasedCorsConfigurationSource source =
            new org.springframework.web.cors.UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
