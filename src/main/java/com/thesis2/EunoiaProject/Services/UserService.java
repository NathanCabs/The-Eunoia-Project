package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.Model.Role;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    // ✅ Register user
    @Transactional
    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent() ||
                userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Email or username already exists");
        }

        // Set default role as USER
        user.setRole("USER");

        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));

        // Save the user to the database
        return userRepository.save(user);
    }

//    // ✅ Login user
//    @Transactional
//    public Optional<User> loginUser(String email, String password) {
//        return userRepository.findByEmail(email)
//                .filter(user -> user.getPassword().equals(password));
//    }

    // ✅ Login user (password verification with hashing)
    @Transactional
    public Optional<User> loginUser(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> bCryptPasswordEncoder.matches(password, user.getPassword())); // Compare hashed password
    }

    // ✅ Get user by ID
    @Transactional(readOnly = true)
    public Optional<User> findById(int id) {
        return userRepository.findById(id);
    }

    // Get User by Email
    @Transactional(readOnly = true)
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // ✅ Get all users (Admin feature)
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

//    // ✅ Update user
//    @Transactional
//    public User updateUser(int userId, User userRequest) {
//        return userRepository.findById(userId).map(existingUser -> {
//            existingUser.setUsername(userRequest.getUsername());
//            existingUser.setPassword(userRequest.getPassword());
//            //existingUser.setRole(userRequest.getRole()); // Allow updating role if needed
//            return userRepository.save(existingUser);
//        }).orElse(null);
//    }

    // ✅ Update user (hash new password before saving)
    @Transactional
    public User updateUser(int userId, User userRequest) {
        return userRepository.findById(userId).map(existingUser -> {
            existingUser.setUsername(userRequest.getUsername());
            if (userRequest.getPassword() != null && !userRequest.getPassword().isEmpty()) {
                existingUser.setPassword(bCryptPasswordEncoder.encode(userRequest.getPassword())); // Hash updated password
            }
            return userRepository.save(existingUser);
        }).orElse(null);
    }

    // ✅ Delete user
    @Transactional
    public boolean deleteUser(int userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}
