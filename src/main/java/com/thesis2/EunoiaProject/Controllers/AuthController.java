package com.thesis2.EunoiaProject.Controllers;


import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import com.thesis2.EunoiaProject.Security.JwtUtil;
import com.thesis2.EunoiaProject.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }



    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }



//    @PostMapping("/login")
//    public String loginUser(@RequestBody Map<String, String> requestBody) {
//        String email = requestBody.get("email");
//        String password = requestBody.get("password");
//
//        Optional<User> user = userService.loginUser(email, password);
//
//        if (user.isPresent()) {
//            return "Login successful";
//        } else {
//            return "Invalid email or password";
//        }
//    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent() && existingUser.get().getPassword().equals(user.getPassword())) {
            String token = jwtUtil.generateToken(existingUser.get().getUsername(), existingUser.get().getRole());
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("role", existingUser.get().getRole());
            response.put("userId", String.valueOf(existingUser.get().getId()));
            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
    }


    @GetMapping("/id")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.findById(id);
    }
}
