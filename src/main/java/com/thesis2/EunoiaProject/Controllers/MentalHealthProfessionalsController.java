package com.thesis2.EunoiaProject.Controllers;


import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.MentalHealthProfessionalsRepository;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import com.thesis2.EunoiaProject.Services.MentalHealthProfessionalsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
//ADMIN CONTROL OF THE PROFESSIONALS
@RestController
@RequestMapping("/api/professionals")
public class MentalHealthProfessionalsController {

    //private static final Logger log = LoggerFactory.getLogger(MentalHealthProfessionalsController.class);
    private final MentalHealthProfessionalsService service;
    private final MentalHealthProfessionalsRepository repository;
    private final UserRepository userRepository;


    public MentalHealthProfessionalsController(MentalHealthProfessionalsService service, MentalHealthProfessionalsRepository repository, UserRepository userRepository) {
        this.service = service;
        this.repository = repository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<MentalHealthProfessionals>> getAll() {
        return ResponseEntity.ok(service.getAllProfessionals());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MentalHealthProfessionals> getById(@PathVariable int id) {
        return service.getProfessionalsById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/recommended")
    public ResponseEntity<List<MentalHealthProfessionals>> getRecommended() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = auth.getName();

        System.out.println("Logged-in email: " + loggedInEmail);

        User user = userRepository.findByEmail(loggedInEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if(user.getRecommendedProfessional() == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }

        List<MentalHealthProfessionals> professionals = repository.findBySpecialization(user.getRecommendedProfessional());

        return ResponseEntity.ok(professionals);
    }

//    @PostMapping("/add")
//    public ResponseEntity<MentalHealthProfessionals> add(@RequestBody MentalHealthProfessionals professional) {
//        return ResponseEntity.ok(service.addProfessional(professional));
//    }

    @PutMapping("/profile/update")
    public ResponseEntity<MentalHealthProfessionals> updateProfile(@RequestBody MentalHealthProfessionals professional) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String loggedInEmail = auth.getName();

        System.out.println("Logged-in email: " + loggedInEmail);

        MentalHealthProfessionals existingProfessional = service.findByEmail(loggedInEmail)
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        // ✅ Update allowed fields
        if (professional.getUsername() != null) {
            existingProfessional.setUsername(professional.getUsername());
        }
        if (professional.getPassword() != null) {
            existingProfessional.setPassword(professional.getPassword());
        }
        if (professional.getSpecialization() != null) {
            existingProfessional.setSpecialization(professional.getSpecialization());
        }
        if (professional.getFocusArea() != null) {
            existingProfessional.setFocusArea(professional.getFocusArea());
        }
        if (professional.getYearsOfExperience() >= 0) {
            existingProfessional.setYearsOfExperience(professional.getYearsOfExperience());
        }
        if (professional.getQualification() != null) {
            existingProfessional.setQualification(professional.getQualification());
        }
        if (professional.getLocation() != null) {
            existingProfessional.setLocation(professional.getLocation());
        }
        if (professional.getAvailability() != null) {
            existingProfessional.setAvailability(professional.getAvailability());
        }
        if (professional.getEmail() != null && !professional.getEmail().equals(loggedInEmail)) {
            throw new IllegalArgumentException("Cannot update professional with different email");
        }

        // ✅ Save updated professional
        MentalHealthProfessionals updatedProfessional = repository.save(existingProfessional);

        return ResponseEntity.ok(updatedProfessional);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        service.deleteProfessional(id);
        return ResponseEntity.ok("Professional deleted successfully");
    }

    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<MentalHealthProfessionals>> getBySpecialization(@PathVariable String specialization) {
        return ResponseEntity.ok(service.getBySpecialization(specialization));
    }

    @GetMapping("/location/{location}")
    public ResponseEntity<List<MentalHealthProfessionals>> getByLocation(@PathVariable String location) {
        return ResponseEntity.ok(service.getByLocation(location));
    }

    @GetMapping("/rating/{rating}")
    public ResponseEntity<List<MentalHealthProfessionals>> getByRating(@PathVariable double rating) {
        return ResponseEntity.ok(service.getByRating(rating));
    }
}
