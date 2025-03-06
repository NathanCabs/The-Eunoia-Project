package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import com.thesis2.EunoiaProject.Repository.MentalHealthProfessionalsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MentalHealthProfessionalsService {
    private final MentalHealthProfessionalsRepository MHPRepository;

    public MentalHealthProfessionalsService(MentalHealthProfessionalsRepository MHPRepository) {
        this.MHPRepository = MHPRepository;

    }

    public List<MentalHealthProfessionals> getAllProfessionals(){
        return MHPRepository.findAll();
    }

    public Optional<MentalHealthProfessionals> getProfessionalsById(int id){
        return MHPRepository.findById(id);
    }

    public MentalHealthProfessionals addProfessional(MentalHealthProfessionals professional) {
        return MHPRepository.save(professional);
    }

    public void deleteProfessional(int id) {
        MHPRepository.deleteById(id);
    }

    public List<MentalHealthProfessionals> getBySpecialization(String specialization) {
        return MHPRepository.findBySpecialization(specialization);
    }

    public List<MentalHealthProfessionals> getByLocation(String location) {
        return MHPRepository.findByLocation(location);
    }

    public List<MentalHealthProfessionals> getByRating(double rating) {
        return MHPRepository.findByRatingGreaterThanEqual(rating);
    }
}

