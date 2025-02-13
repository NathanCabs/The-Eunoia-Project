package com.thesis2.EunoiaProject.Controllers;


import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

//    @PostMapping("/login")
//    public String loginUser(@RequestParam String email, @RequestParam String password) {
//        Optional<User> user = userService.loginUser(email, password);
//
//        if (user.isPresent()) {
//            return "Login successful";
//        } else {
//            return "Invalid email or password";
//        }
//    }

    @PostMapping("/login")
    public String loginUser(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String password = requestBody.get("password");

        Optional<User> user = userService.loginUser(email, password);

        if (user.isPresent()) {
            return "Login successful";
        } else {
            return "Invalid email or password";
        }
    }



    @GetMapping("/id")
    public Optional<User> getUserById(@PathVariable int id) {
        return userService.findById(id);
    }
}
