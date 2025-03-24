package com.thesis2.EunoiaProject.Controllers;


import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import com.thesis2.EunoiaProject.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "https://eunoia.social")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getProfile() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = auth.getName();
        User user = userService.findByEmail(loggedInEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }


    @PutMapping("/profile/update")
    public ResponseEntity<User> updateProfile(@RequestBody User user) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = auth.getName();


        //String loggedInEmail = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        System.out.println("Logged-in email: " + loggedInEmail);

        User existingUser = userService.findByEmail(loggedInEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (user.getUsername() != null){
            existingUser.setUsername(user.getUsername());
        }
        if (user.getPassword() != null){
            existingUser.setPassword(user.getPassword());
        }

        if (user.getEmail() != null && !user.getEmail().equals(loggedInEmail)) {
            throw new IllegalArgumentException("Cannot update user with different email");
        }


        User updatedUser = userRepository.save(existingUser);

        return ResponseEntity.ok(updatedUser);

    }
}
