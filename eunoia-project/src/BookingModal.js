// BookingModal.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from './Axios';

const BookingModal = ({ show, handleClose, professionalId, refreshBookings }) => {
  const [bookingDateTime, setBookingDateTime] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBookingSubmit = async () => {
    if (!bookingDateTime) {
      alert("Please select a booking date and time.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const payload = { professionalId, bookingDateTime };
      const response = await api.post("http://localhost:6543/api/bookings", payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      // Assuming a successful booking returns HTTP 200 or 201
      if (response.ok || response.status === 200) {
        alert("Booking created successfully. Status: PENDING.");
        handleClose();
        if (refreshBookings) refreshBookings();
      } else {
        alert("Error creating booking.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Error creating booking: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Professional</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="bookingDateTime">
            <Form.Label>Select Date and Time</Form.Label>
            <Form.Control 
              type="datetime-local"
              value={bookingDateTime}
              onChange={(e) => setBookingDateTime(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleBookingSubmit} disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
