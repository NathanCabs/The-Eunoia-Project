package com.thesis2.EunoiaProject.Repository;

import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MentalHealthProfessionalsRepository extends JpaRepository<MentalHealthProfessionals, Integer> {
    List<MentalHealthProfessionals> findBySpecialization(String specialization);
    List<MentalHealthProfessionals> findByLocation(String location);
    List<MentalHealthProfessionals> findByRatingGreaterThanEqual(double  rating);
    Optional<MentalHealthProfessionals> findByEmail(String email);
}
