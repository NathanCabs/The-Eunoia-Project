import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import ProfessionalNavbar from './ProfessionalNavbar';
import api from './Axios';
import { useNavigate } from 'react-router-dom';

const ProfessionalBooking = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // For cancellation confirmation modal
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get("https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/bookings/professional", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
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
  
  const handleConfirm = async (bookingId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.put(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/bookings/confirm/${bookingId}`, {}, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      if (response.status === 200) {
        alert("Booking confirmed!");
        fetchBookings();
      } else {
        alert("Failed to confirm booking.");
      }
    } catch (err) {
      console.error("Error confirming booking:", err);
      alert("Error confirming booking: " + err.message);
    }
  };

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    if (!selectedBooking) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.delete(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/bookings/${selectedBooking.id}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      if (response.status === 200 || response.status === 204) {
        alert("Booking cancelled!");
        setShowCancelModal(false);
        setSelectedBooking(null);
        fetchBookings();
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Error cancelling booking: " + err.message);
    }
  };

  const pendingBookings = bookings.filter(b => b.status === "PENDING");
  const confirmedBookings = bookings.filter(b => b.status === "CONFIRMED");

  return (
    <div>
      <ProfessionalNavbar />
      <Container style={{ paddingTop: "1.5rem" }}>
        <h1>Professional Bookings</h1>
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <h3>Confirmed Bookings</h3>
            {confirmedBookings.length === 0 ? (
              <p>No confirmed bookings.</p>
            ) : (
              <Row>
                {confirmedBookings.map(booking => (
                  <Col key={booking.id} xs={12} md={6} lg={4} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{booking.user.username}</Card.Title>
                        <Card.Text>
                          <strong>Date/Time:</strong> {new Date(booking.bookDateTime).toLocaleString()}
                        </Card.Text>
                        <div className="d-flex justify-content-end">
                          <Button variant="danger" onClick={() => handleCancelClick(booking)}>
                            Cancel
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
            <hr></hr>
            <h3>Pending Bookings</h3>
            {pendingBookings.length === 0 ? (
              <p>No pending bookings.</p>
            ) : (
              <Row className="mb-4">
                {pendingBookings.map(booking => (
                  <Col key={booking.id} xs={12} md={6} lg={4} className="mb-3">
                    <Card>
                      <Card.Body>
                        <Card.Title>{booking.user.username}</Card.Title>
                        <Card.Text>
                          <strong>Date/Time:</strong> {new Date(booking.bookDateTime).toLocaleString()}
                        </Card.Text>
                        <div className="d-flex justify-content-end">
                          <Button variant="success" className="me-2" onClick={() => handleConfirm(booking.id)}>
                            Confirm
                          </Button>
                          <Button variant="danger" onClick={() => handleCancelClick(booking)}>
                            Cancel
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </>
        )}
      </Container>
      {/* Cancellation Confirmation Modal */}
      <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this booking?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCancelModal(false)}>
            No, keep it
          </Button>
          <Button variant="danger" onClick={confirmCancel}>
            Yes, cancel it
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfessionalBooking;
