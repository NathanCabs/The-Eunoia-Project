package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.MentalHealthProfessionalsRepository;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordHashingService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MentalHealthProfessionalsRepository professionalRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @EventListener(ContextRefreshedEvent.class)  // Runs when the app starts
    public void hashExistingPasswords() {
        hashUsers();
        hashProfessionals();
    }

    private void hashUsers() {
        List<User> users = userRepository.findAll();
        for (User user : users) {
            if (!user.getPassword().startsWith("$2a$")) { // Check if already hashed
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            }
        }
        userRepository.saveAll(users);
    }

    private void hashProfessionals() {
        List<MentalHealthProfessionals> professionals = professionalRepository.findAll();
        for (MentalHealthProfessionals professional : professionals) {
            if (!professional.getPassword().startsWith("$2a$")) { // Check if already hashed
                professional.setPassword(bCryptPasswordEncoder.encode(professional.getPassword()));
            }
        }
        professionalRepository.saveAll(professionals);
    }
}
