import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import api from './Axios';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

function MyBooking() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Fetch the bookings for the logged-in user
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get("https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/bookings/user", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      // If using axios, response.data contains the bookings
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("An error occurred while fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // When user clicks Cancel button on a booking card, open confirmation modal
  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowConfirmModal(true);
  };

  // Confirm cancellation: call backend DELETE endpoint
  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.delete(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/bookings/${selectedBooking.id}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      // Assuming a successful deletion returns HTTP 204 or 200
      if (response.status === 204 || response.status === 200) {
        alert("Booking cancelled successfully!");
        setShowConfirmModal(false);
        fetchBookings();
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("An error occurred while cancelling the booking.");
    }
  };

  const handleCloseModal = () => {
    setShowConfirmModal(false);
    setSelectedBooking(null);
  };

  return (
    <div className="homeBackground" fluid>
      <NavigationBar />
      <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
        <Row>
          <Col style={{ paddingBottom: "1.5rem" }}>
            <h2 className="text-center mb-4" style={{fontFamily:"font2"}}>My Booking</h2>
          </Col>
        </Row>
        <Row>
          {loading ? (
            <p style={{fontFamily:"font1"}}>Loading bookings...</p>
          ) : error ? (
            <p>{error}</p>
          ) : bookings.length === 0 ? (
            <p style={{fontFamily:"font1"}}>You have no bookings.</p>
          ) : (
            bookings.map((booking) => (
              <Col key={booking.id} xs={12} md={6} lg={4} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {booking.professional.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {booking.professional.specialization}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Date/Time:</strong> {new Date(booking.bookDateTime).toLocaleString()}
                      <br />
                      <strong>Status:</strong> {booking.status}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-end">
                    <Button variant="danger" onClick={() => handleCancelClick(booking)}>
                      Cancel
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Confirm Cancellation Modal */}
      <Modal show={showConfirmModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this booking?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No, keep it
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Yes, cancel it
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyBooking;
