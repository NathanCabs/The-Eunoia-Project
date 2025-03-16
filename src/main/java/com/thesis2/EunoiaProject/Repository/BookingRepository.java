package com.thesis2.EunoiaProject.Repository;

import com.thesis2.EunoiaProject.Model.Booking;
import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import com.thesis2.EunoiaProject.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface BookingRepository  extends JpaRepository<Booking, Integer> {
    List<Booking> findByUser(User user);
    List<Booking> findByProfessional(MentalHealthProfessionals professional);
    Optional<Booking> findByProfessionalAndBookDateTime(MentalHealthProfessionals professional, LocalDateTime bookDateTime);
    //boolean isExistingByProfessionalAndBookDateTime(MentalHealthProfessionals professional, LocalDateTime bookDateTime);
}
