package com.thesis2.EunoiaProject.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    private final String SECRET_KEY = "your_secret_key"; // Change this to a secure key

    public String generateToken(String username, String email, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("email", email);
        claims.put("role", role);
        return createToken(claims, email);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7L * 24L * 60L * 60L * 1000L)) // 7 days expiry
               .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
              .compact();
    }

//    public String generateToken(String username, String role) {
//        return Jwts.builder()
//                .setSubject(username)
//                .claim("role", role)
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 hour expiry
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
//    }

    public Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }

//    public String extractUsername(String token) {
//        return extractClaims(token).getSubject();
//    }

    public String extractUsername(String token) {
        return extractClaims(token).get("username", String.class);
    }
//    public String extractEmail(String token) {
//        return extractClaims(token).get("email", String.class);
//    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public boolean isTokenValid(String token, String email) {
        return extractEmail(token).equals(email) && extractClaims(token).getExpiration().after(new Date());
    }
}
