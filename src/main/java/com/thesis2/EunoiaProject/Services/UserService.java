package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.Model.Role;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // ✅ Register user
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

    // ✅ Login user
    public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }

    // ✅ Get user by ID
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    // ✅ Get all users (Admin feature)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // ✅ Update user
    public User updateUser(int userId, User userRequest) {
        return userRepository.findById(userId).map(existingUser -> {
            existingUser.setEmail(userRequest.getEmail());
            existingUser.setUsername(userRequest.getUsername());
            existingUser.setRole(userRequest.getRole()); // Allow updating role if needed
            return userRepository.save(existingUser);
        }).orElse(null);
    }

    // ✅ Delete user
    public boolean deleteUser(int userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
