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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "https://eunoia.social")
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;
    private final MentalHealthProfessionalsService MHPService;
    private final MentalHealthProfessionalsRepository MHPRepo;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public AuthController(UserRepository userRepository, JwtUtil jwtUtil, MentalHealthProfessionalsService MHPService, MentalHealthProfessionalsRepository MHPRepo, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.MHPService = MHPService;
        this.MHPRepo = MHPRepo;
        this.jwtUtil = jwtUtil;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
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

//    // PROFESSIONAL LOGIN
//    @PostMapping("/login/professional")
//    public ResponseEntity<Map<String, String>> loginProfessional(@RequestBody MentalHealthProfessionals mentalHealthProfessionals) {
//        Optional<MentalHealthProfessionals> existingMHP = MHPRepo.findByEmail(mentalHealthProfessionals.getEmail());
//
//        if (existingMHP.isPresent() && existingMHP.get().getPassword().equals(mentalHealthProfessionals.getPassword())) {
//            String token = jwtUtil.generateToken(
//                    existingMHP.get().getUsername(),
//                    existingMHP.get().getEmail(),
//                    existingMHP.get().getRole());
//
//            Map<String, String> response = new HashMap<>();
//            response.put("token", token);
//            response.put("userId", String.valueOf(existingMHP.get().getId()));
//            response.put("role", existingMHP.get().getRole());
//            // Extra details for professionals
//            response.put("username", existingMHP.get().getUsername());
//            response.put("userEmail", existingMHP.get().getEmail());
//            response.put("password", existingMHP.get().getPassword());
//            return ResponseEntity.ok(response);
//        }
//        return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
//    }

    // ✅ PROFESSIONAL LOGIN (Password Hashing Applied)
    @PostMapping("/login/professional")
    public ResponseEntity<Map<String, String>> loginProfessional(@RequestBody MentalHealthProfessionals mentalHealthProfessionals) {
        Optional<MentalHealthProfessionals> existingMHP = MHPRepo.findByEmail(mentalHealthProfessionals.getEmail());

        if (existingMHP.isPresent() && bCryptPasswordEncoder.matches(mentalHealthProfessionals.getPassword(), existingMHP.get().getPassword())) {
            String token = jwtUtil.generateToken(
                    existingMHP.get().getUsername(),
                    existingMHP.get().getEmail(),
                    existingMHP.get().getRole());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", String.valueOf(existingMHP.get().getId()));
            response.put("role", existingMHP.get().getRole());
            response.put("username", existingMHP.get().getUsername());
            response.put("userEmail", existingMHP.get().getEmail());

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
    }

    // ✅ USER LOGIN (Password Hashing Applied)
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());

        if (existingUser.isPresent() && bCryptPasswordEncoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            String token = jwtUtil.generateToken(
                    existingUser.get().getUsername(),
                    existingUser.get().getEmail(),
                    existingUser.get().getRole());

            Map<String, String> response = new HashMap<>();
            response.put("token", token);
            response.put("userId", String.valueOf(existingUser.get().getId()));
            response.put("role", existingUser.get().getRole());
            response.put("username", existingUser.get().getUsername());
            response.put("userEmail", existingUser.get().getEmail());

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

//    @PostMapping("/login")
//    public ResponseEntity<Map<String, String>> login(@RequestBody User user) {
//        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
//
//        if (existingUser.isPresent()) {
//            String token = jwtUtil.generateToken(
//                    existingUser.get().getUsername(),
//                    existingUser.get().getEmail(),
//                    existingUser.get().getRole());
//
//            Map<String, String> response = new HashMap<>();
//            response.put("token", token);
//            response.put("userId", String.valueOf(existingUser.get().getId()));
//            response.put("role", existingUser.get().getRole());
//            // Extra details for regular users
//            response.put("username", existingUser.get().getUsername());
//            response.put("userEmail", existingUser.get().getEmail());
//            response.put("password", existingUser.get().getPassword());
//            return ResponseEntity.ok(response);
//        }
//
//        return ResponseEntity.status(401).body(Collections.singletonMap("message", "Invalid credentials"));
//    }



    @GetMapping("/id")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.findById(id);
    }
}
