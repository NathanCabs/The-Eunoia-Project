package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.Model.Role;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent() ||
                userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Email or username already exists");
        }

        // Set default role as USER
        user.setRole(Role.USER);

        // Save the user to the database
        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password) {
        // Find user by email and check the password
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }

    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }
}
