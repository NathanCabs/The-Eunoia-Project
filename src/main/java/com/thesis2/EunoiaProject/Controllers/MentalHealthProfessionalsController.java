package com.thesis2.EunoiaProject.Controllers;


import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import com.thesis2.EunoiaProject.Services.MentalHealthProfessionalsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/professionals")
public class MentalHealthProfessionalsController {

    private final MentalHealthProfessionalsService service;

    public MentalHealthProfessionalsController(MentalHealthProfessionalsService service) {
        this.service = service;
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

    @PostMapping("/add")
    public ResponseEntity<MentalHealthProfessionals> add(@RequestBody MentalHealthProfessionals professional) {
        return ResponseEntity.ok(service.addProfessional(professional));
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
