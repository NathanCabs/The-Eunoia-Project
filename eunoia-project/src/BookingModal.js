import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from './Axios';

// Helper: Map JavaScript's getDay() numbers to DayofWeek strings.
const dayMapping = {
  0: "SUNDAY",
  1: "MONDAY",
  2: "TUESDAY",
  3: "WEDNESDAY",
  4: "THURSDAY",
  5: "FRIDAY",
  6: "SATURDAY"
};

// Generate time options from 10:00 to 17:00 in 30-minute increments.
const generateTimeOptions = () => {
  const times = [];
  for (let hour = 10; hour <= 17; hour++) {
    const hourStr = hour.toString().padStart(2, '0');
    times.push(`${hourStr}:00`);
    if (hour !== 17) {  // Exclude 17:30 since last valid time is 17:00
      times.push(`${hourStr}:30`);
    }
  }
  return times;
};

const timeOptions = generateTimeOptions();

const BookingModal = ({ show, handleClose, professionalId, refreshBookings, availableDays = [] }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculate today's date in YYYY-MM-DD format.
  const today = new Date().toISOString().split('T')[0];

  // Validate the chosen date against the professional's available days.
  const validateDate = (dateStr) => {
    if (!dateStr) return false;
    const selectedDate = new Date(dateStr);
    const dayOfWeek = dayMapping[selectedDate.getUTCDay()]; // Use getDay() if working in local time.
    // Check if the selected day is included in availableDays (case-insensitive)
    return availableDays.map(day => day.toUpperCase()).includes(dayOfWeek);
  };

  const handleBookingSubmit = async () => {
    if (!bookingDate || !bookingTime) {
      alert("Please select both a booking date and time.");
      return;
    }
    // Check that the selected date is not in the past.
    if (bookingDate < today) {
      alert("Please select a valid future date.");
      return;
    }
    // Validate selected date's day-of-week
    if (!validateDate(bookingDate)) {
      alert(`The selected date is not available. Please choose a date on: ${availableDays.join(', ')}`);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      // Combine date and time into ISO format (assumes local time)
      const bookingDateTime = `${bookingDate}T${bookingTime}`;
      const payload = { professionalId, bookingDateTime };
      const response = await api.post("http://localhost:6543/api/bookings", payload, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      if (response.status === 200 || response.status === 201) {
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
    <Modal show={show} onHide={handleClose} centered style={{fontFamily:"font1"}}>
      <Modal.Header closeButton>
        <Modal.Title style={{fontFamily:"font2"}}>Book Professional</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="bookingDate">
            <Form.Label>Select Date</Form.Label>
            <Form.Control 
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              min={today}  // Prevent selection of past dates
            />
            {availableDays.length > 0 && (
              <Form.Text className="text-muted">
                Available days: {availableDays.join(', ')}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="bookingTime" className="mt-3">
            <Form.Label>Select Time (10AM - 5PM)</Form.Label>
            <Form.Select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
              <option value="">Select time</option>
              {timeOptions.map((time, idx) => (
                <option key={idx} value={time}>{time}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button className="button-20" variant="secondary" onClick={handleClose} style={{margin:"5px"}}>Cancel</Button>
        <Button className="button-19" variant="primary" onClick={handleBookingSubmit} disabled={loading} style={{margin:"5px"}}>
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;