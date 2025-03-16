package com.thesis2.EunoiaProject.DTO;

import java.time.LocalDateTime;

public class BookingRequest {
    private int professionalId;
    private LocalDateTime bookingDateTime;

    public int getProfessionalId() {
        return professionalId;
    }

    public void setProfessionalId(int professionalId) {
        this.professionalId = professionalId;
    }

    public LocalDateTime getBookingDateTime() {
        return bookingDateTime;
    }

    public void setBookingDateTime(LocalDateTime bookingDateTime) {
        this.bookingDateTime = bookingDateTime;
    }
}
