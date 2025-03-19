package com.thesis2.EunoiaProject.Services;


import com.thesis2.EunoiaProject.Model.Booking;
import com.thesis2.EunoiaProject.Model.BookingStatus;
import com.thesis2.EunoiaProject.Model.MentalHealthProfessionals;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.BookingRepository;
import com.thesis2.EunoiaProject.Repository.MentalHealthProfessionalsRepository;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class BookingService {
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final MentalHealthProfessionalsRepository MHPrepo;

    public BookingService(BookingRepository bookingRepository, UserRepository userRepository, MentalHealthProfessionalsRepository MHPrepo) {
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.MHPrepo = MHPrepo;
    }

    @Transactional
    public Booking createBooking(String userEmail, int professionalId, LocalDateTime bookingDateTime) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        MentalHealthProfessionals professionals = MHPrepo.findById(professionalId)
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        if(bookingRepository.findByProfessionalAndBookDateTime(professionals, bookingDateTime).isPresent()){
            throw new RuntimeException("Booking already exists");
        }

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setProfessional(professionals);
        booking.setBookDateTime(bookingDateTime);
        booking.setStatus(BookingStatus.PENDING);

        return bookingRepository.save(booking);
    }

    // ✅ Get User Bookings
    @Transactional(readOnly = true)
    public List<Booking> getBookings(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return bookingRepository.findByUser(user);
    }

    // ✅ Get Professional Bookings
    @Transactional(readOnly = true)
    public List<Booking> getProfessionalBookings(String professionalEmail) {
        MentalHealthProfessionals professional = MHPrepo.findByEmail(professionalEmail)
                .orElseThrow(() -> new RuntimeException("Professional not found"));

        return bookingRepository.findByProfessional(professional);
    }

    // ✅ Get All Bookings (Admin only)
    @Transactional(readOnly = true)
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // ✅ Cancel Booking
    @Transactional
    public void cancelBooking(int bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.delete(booking);
    }

    // ✅ Cancel Booking
    @Transactional
    public void confirmBooking(int bookingId, String email) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if(!booking.getProfessional().getEmail().equals(email)) {
            throw new IllegalArgumentException("Unauthorized");
        }

        booking.setStatus(BookingStatus.CONFIRMED);
        bookingRepository.save(booking);
    }
}
