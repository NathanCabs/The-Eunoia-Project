package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.DTO.MHPRegisterRequest;
import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import com.thesis2.EunoiaProject.Repository.MentalHealthProfessionalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MentalHealthProfessionalsService {
    @Autowired
    private final MentalHealthProfessionalsRepository MHPRepository;


    public MentalHealthProfessionalsService(MentalHealthProfessionalsRepository MHPRepository) {
        this.MHPRepository = MHPRepository;

    }

    //Register Professional
    public String registerProfessional(MHPRegisterRequest registerRequest) {
        if (MHPRepository.findByEmail(registerRequest.getEmail()).isPresent()){
            return "Email Already Exists";
        }

        MentalHealthProfessionals professional = new MentalHealthProfessionals();
        professional.setName(registerRequest.getName());
        professional.setEmail(registerRequest.getEmail());
        professional.setPassword(registerRequest.getPassword());
        professional.setUsername(professional.getName());
        professional.setSpecialization("Not specified");
        professional.setFocusArea("Not specified");
        professional.setYearsOfExperience(0);
        professional.setQualification("Not specified");
        professional.setLocation("Not specified");
        professional.setAvailability("Not specified");
        professional.setRating(0.0);
        professional.setRole("PROFESSIONAL");

        MHPRepository.save(professional);

        return "Professional Registered Successfully";
    }

    //Login Professional
    public String loginProfessional(String email, String password) {
        Optional<MentalHealthProfessionals> professional = MHPRepository.findByEmail(email);
        if (professional.isPresent() && professional.get().getPassword().equals(password)) {
            return "Login successful!";
        } else {
            return "Invalid email or password";
        }
    }

    public List<MentalHealthProfessionals> getAllProfessionals(){
        return MHPRepository.findAll();
    }

    public Optional<MentalHealthProfessionals> findByEmail(String email){
        return MHPRepository.findByEmail(email);
    }

    public Optional<MentalHealthProfessionals> getProfessionalsById(int id){
        return MHPRepository.findById(id);
    }

//    public MentalHealthProfessionals addProfessional(MentalHealthProfessionals professional) {
//        return MHPRepository.save(professional);
//    }

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

