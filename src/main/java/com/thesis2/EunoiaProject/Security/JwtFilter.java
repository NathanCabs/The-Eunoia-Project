package com.thesis2.EunoiaProject.Security;

import com.thesis2.EunoiaProject.Repository.MentalHealthProfessionalsRepository;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;
@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final MentalHealthProfessionalsRepository MHPRepository;

    public JwtFilter(JwtUtil jwtUtil, UserRepository userRepository, MentalHealthProfessionalsRepository MHPRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.MHPRepository = MHPRepository;
    }

    @Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
        throws ServletException, IOException {
    final String authHeader = request.getHeader("Authorization");

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        chain.doFilter(request, response);
        return;
    }

    final String token = authHeader.substring(7);

    try {
        final String username = jwtUtil.extractUsername(token);
        final String email = jwtUtil.extractEmail(token);
        final String role = jwtUtil.extractRole(token);

        System.out.println("Username: " + username);
        System.out.println("Email: " + email);
        System.out.println("Role: " + role);

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            Optional<UserDetails> userDetails = Optional.empty();

            if ("USER".equals(role)) {
                userDetails = userRepository.findByEmail(email)
                        .map(user -> new org.springframework.security.core.userdetails.User(
                                user.getEmail(),
                                user.getPassword(),
                                Collections.singleton(new SimpleGrantedAuthority(role))
                        ));
            } else if ("PROFESSIONAL".equals(role)) {
                userDetails = MHPRepository.findByEmail(email)
                        .map(professional -> new org.springframework.security.core.userdetails.User(
                                professional.getEmail(),
                                professional.getPassword(),
                                Collections.singleton(new SimpleGrantedAuthority(role))
                        ));
            } else if ("ADMIN".equals(role)) {
                userDetails = userRepository.findByEmail(email)
                        .map(user -> new org.springframework.security.core.userdetails.User(
                                user.getEmail(),
                                user.getPassword(),
                                Collections.singleton(new SimpleGrantedAuthority(role))
                        ));
            }

            if (userDetails.isPresent() && jwtUtil.isTokenValid(token, email)) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails.get(), null, userDetails.get().getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

    } catch (io.jsonwebtoken.ExpiredJwtException e) {
        logger.error("Token expired: " + e.getMessage());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Token expired");
        return;
    } catch (io.jsonwebtoken.JwtException e) {
        logger.error("Invalid token: " + e.getMessage());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write("Invalid token");
        return;
    } catch (Exception e) {
        logger.error("Error processing JWT: " + e.getMessage());
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        response.getWriter().write("An error occurred while processing the token");
        return;
    }

    chain.doFilter(request, response);
}
}

//     @Override
//     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//             throws ServletException, IOException {
//         final String authHeader = request.getHeader("Authorization");

//         if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//             chain.doFilter(request, response);
//             return;
//         }

//         final String token = authHeader.substring(7);
//         final String username = jwtUtil.extractUsername(token);
//         final String email = jwtUtil.extractEmail(token);
//         final String role = jwtUtil.extractRole(token);

//         System.out.println("Username: " + username);
//         System.out.println("Email: " + email);
//         System.out.println("Role: " + role);

//         if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//             Optional<UserDetails> userDetails = Optional.empty();

//             if ("USER".equals(role)) {
//                 userDetails = userRepository.findByEmail(email)
//                         .map(user -> new org.springframework.security.core.userdetails.User(
//                                 user.getEmail(),
//                                 user.getPassword(),
//                                 Collections.singleton(new SimpleGrantedAuthority(role))
//                         ));
//             } else if ("PROFESSIONAL".equals(role)) {
//                 userDetails = MHPRepository.findByEmail(email)
//                         .map(professional -> new org.springframework.security.core.userdetails.User(
//                                 professional.getEmail(),
//                                 professional.getPassword(),
//                                 Collections.singleton(new SimpleGrantedAuthority(role))
//                         ));
//             }
//                 else if ("ADMIN".equals(role)) { // ➡️ Handle the ADMIN role
//                     userDetails = userRepository.findByEmail(email) // Admin should be in the User table
//                             .map(user -> new org.springframework.security.core.userdetails.User(
//                                     user.getEmail(),
//                                     user.getPassword(),
//                                     Collections.singleton(new SimpleGrantedAuthority(role))
//                             ));
//             }

//             if (userDetails.isPresent() && jwtUtil.isTokenValid(token, email)) {
//                 UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
//                         userDetails.get(), null, userDetails.get().getAuthorities());
//                 authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//                 SecurityContextHolder.getContext().setAuthentication(authentication);
//             }
//         }
// //        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
// //            Optional<UserDetails> userDetails = userRepository.findByEmail(email)
// //                    .map(user -> new org.springframework.security.core.userdetails.User(
// //                            user.getEmail(),
// //                            user.getPassword(),
// //                            Collections.singleton(new SimpleGrantedAuthority(role))));
// //
// //            if (userDetails.isPresent() && jwtUtil.isTokenValid(token, email)) {
// //                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
// //                        userDetails.get(), null, userDetails.get().getAuthorities());
// //                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
// //                SecurityContextHolder.getContext().setAuthentication(authentication);
// //
// //                //request.setAttribute("email", email);
// //            }
// //        }
//         chain.doFilter(request, response);
//     }
// }
