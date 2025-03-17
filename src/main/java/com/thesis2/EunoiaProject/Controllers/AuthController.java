package com.thesis2.EunoiaProject.Controllers;


import com.thesis2.EunoiaProject.DTO.MHPRegisterRequest;
import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.MentalHealthProfessionalsRepository;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import com.thesis2.EunoiaProject.Security.JwtUtil;
import com.thesis2.EunoiaProject.Services.MentalHealthProfessionalsService;
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
    private final MentalHealthProfessionalsService MHPService;
    private final MentalHealthProfessionalsRepository MHPRepo;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, MentalHealthProfessionalsService MHPService, MentalHealthProfessionalsRepository MHPRepo) {
        this.userRepository = userRepository;
        this.MHPService = MHPService;
        this.MHPRepo = MHPRepo;
        this.jwtUtil = jwtUtil;
    }



    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

    //PROFESSIONAL REGISTER
    @PostMapping("/register/professional")
    public String registerProfessional(@RequestBody MHPRegisterRequest registerRequest) {
        return MHPService.registerProfessional(registerRequest);
    }

    //PROFESSIONAL LOGIN

    // @PostMapping("/login/professional")
    // public ResponseEntity<Map<String, String>> loginProfessional(@RequestBody MentalHealthProfessionals mentalHealthProfessionals) {
    //     Optional<MentalHealthProfessionals> existingMHP = MHPRepo.findByEmail(mentalHealthProfessionals.getEmail());

    //     if (existingMHP.isPresent()) {
    //         String token = jwtUtil.generateToken(
    //                 existingMHP.get().getUsername(),
    //                 existingMHP.get().getEmail(),
    //                 existingMHP.get().getRole());

    //                 Map<String, String> response = new HashMap<>();
    //                 response.put("token", token);
    //                 response.put("userId", String.valueOf(existingMHP.get().getId())); // Optional
    //                 response.put("role", existingMHP.get().getRole());
        
    //                 return ResponseEntity.ok(response);
    //     }
    //     return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
    // }

    @PostMapping("/login/professional")
    public ResponseEntity<Map<String, String>> loginProfessional(@RequestBody MentalHealthProfessionals mentalHealthProfessionals) {
    Optional<MentalHealthProfessionals> existingMHP = MHPRepo.findByEmail(mentalHealthProfessionals.getEmail());
    
    // Optionally check the password as well
    if (existingMHP.isPresent() && existingMHP.get().getPassword().equals(mentalHealthProfessionals.getPassword())) {
        String token = jwtUtil.generateToken(
                existingMHP.get().getUsername(),
                existingMHP.get().getEmail(),
                existingMHP.get().getRole());
                
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", String.valueOf(existingMHP.get().getId()));
        response.put("role", existingMHP.get().getRole());
        return ResponseEntity.ok(response);
    }
    
    return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
}


    // @PostMapping("/login/professional")
    // public ResponseEntity<String> loginProfessional(@RequestBody MentalHealthProfessionals mentalHealthProfessionals) {
    //     Optional<MentalHealthProfessionals> existingMHP = MHPRepo.findByEmail(mentalHealthProfessionals.getEmail());

    //     if (existingMHP.isPresent()) {
    //         String token = jwtUtil.generateToken(
    //                 existingMHP.get().getUsername(),
    //                 existingMHP.get().getEmail(),
    //                 existingMHP.get().getRole());

    //         return ResponseEntity.ok("Bearer " + token);
    //     }
    //     return ResponseEntity.status(401).body("Invalid email or password");
    // }

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

    // @PostMapping("/login")
    // public ResponseEntity<String> login(@RequestBody User user) {
    //     Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

    //     if (existingUser.isPresent()) {
    //         String token = jwtUtil.generateToken(
    //                 existingUser.get().getUsername(),
    //                 existingUser.get().getEmail(),
    //                 existingUser.get().getRole());

    //         return ResponseEntity.ok(token);
    //     }

    //     return ResponseEntity.status(401).body("Invalid credentials");
    // }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent()) {
            String token = jwtUtil.generateToken(
                    existingUser.get().getUsername(),
                    existingUser.get().getEmail(),
                    existingUser.get().getRole());

            // ✅ Return JSON object instead of plain string
            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", String.valueOf(existingUser.get().getId())); // Optional
            response.put("role", existingUser.get().getRole());

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
    }



    @GetMapping("/id")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.findById(id);
    }
}
