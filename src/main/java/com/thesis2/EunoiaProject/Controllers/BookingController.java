package com.thesis2.EunoiaProject.Controllers;

import com.thesis2.EunoiaProject.DTO.BookingRequest;
import com.thesis2.EunoiaProject.Model.Booking;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Services.BookingService;
import com.thesis2.EunoiaProject.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;
    private final UserService userService;

    public BookingController(BookingService bookingService, UserService userService) {
        this.bookingService = bookingService;
        this.userService = userService;
    }

//    @PostMapping
//    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        String loggedInEmail = auth.getName();
//        System.out.println("Logged-in email: " + loggedInEmail);
//
//        User existingUser = userService.findByEmail(loggedInEmail)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        Booking booking = bookingService.createBooking(loggedInEmail, id);
//        return ResponseEntity.ok(booking);
//    }

    // ✅ Create Booking (User only)
    @PostMapping
    public ResponseEntity<Booking> createBooking(
            @RequestBody BookingRequest bookingRequest, Authentication auth) {

        String email = auth.getName();
        System.out.println("Professional Id " + bookingRequest.getProfessionalId());
        Booking booking = bookingService.createBooking(email,
                bookingRequest.getProfessionalId(),
                bookingRequest.getBookingDateTime());
        return ResponseEntity.ok(booking);
    }


    // ✅ Get User Bookings
    @GetMapping("/user")
    public ResponseEntity<List<Booking>> getUserBookings(Authentication auth) {
        String email = auth.getName();
        return ResponseEntity.ok(bookingService.getBookings(email));
    }

    // ✅ Get Professional Bookings
    @GetMapping("/professional")
    public ResponseEntity<List<Booking>> getProfessionalBookings(Authentication auth) {
        String email = auth.getName();
        return ResponseEntity.ok(bookingService.getProfessionalBookings(email));
    }

    // ✅ Get All Bookings (Admin only)
    @GetMapping("/admin")
    public ResponseEntity<List<Booking>> getAllBookings(Authentication auth) {
        String email = auth.getName();
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // ✅ Cancel Booking (User only)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelBooking(@PathVariable int id) {
        bookingService.cancelBooking(id);
        return ResponseEntity.noContent().build();
    }

    // // ✅ Confirm Booking
    @PutMapping("/confirm/{id}")
    public ResponseEntity<?> confirmBooking(@PathVariable int id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        bookingService.confirmBooking(id, email);
        return ResponseEntity.ok("Booking Confirmed");
    }
}
