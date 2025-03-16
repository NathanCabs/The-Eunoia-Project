package com.thesis2.EunoiaProject.Model;


import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name="bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "professional_id", nullable = false)
    private MentalHealthProfessionals professional;

    @Column(name = "book_date_time", nullable = false)
    private LocalDateTime bookDateTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private BookingStatus status;

    public boolean isConflict(LocalDateTime bookDateTime) {
        return this.bookDateTime.equals(bookDateTime) &&
                this.status == BookingStatus.CONFIRMED;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public MentalHealthProfessionals getProfessional() {
        return professional;
    }

    public void setProfessional(MentalHealthProfessionals professional) {
        this.professional = professional;
    }

    public LocalDateTime getBookDateTime() {
        return bookDateTime;
    }

    public void setBookDateTime(LocalDateTime bookDateTime) {
        this.bookDateTime = bookDateTime;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }
}
