import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import api from './Axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
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
      <Container style={{ width: "100%", paddingTop: "1.5rem", userSelect:"none" }}>
        <Row>
          <Col style={{ paddingBottom: "1.5rem" }}>
            <h2 className="text-center mb-4" style={{fontFamily:"font2"}}>My Booking</h2>
          </Col>
        </Row>
        <Row>
          {loading ? (
            <center>
              <Container className="homeBackground" style={{fontFamily:"font1", marginTop:"10%"}}>
                  <FontAwesomeIcon icon={faCircleNotch} spin style={{fontSize:"120px", marginBottom:"10px", color:"#8F87F1"}}/>
                  <p>Loading bookings...</p>
              </Container>
            </center>
          ) : error ? (
            <p>{error}</p>
          ) : bookings.length === 0 ? (
            <p style={{fontFamily:"font1"}}>You have no bookings.</p>
          ) : (
            bookings.map((booking) => (
              <Col key={booking.id} xs={12} md={6} lg={4} className="mb-4">
                <Card style={{fontFamily:"font1", border:"solid 3px #3674B5", borderRadius:"6px"}}>
                  <Card.Body>
                    <Card.Title style={{fontFamily:"font2"}}>
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
                    <Button className="button-21" variant="danger" onClick={() => handleCancelClick(booking)} style={{width:"100%"}}>
                      Cancel
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Confirm Cancellation Modal */}
      <Modal show={showConfirmModal} onHide={handleCloseModal} centered style={{fontFamily:"font1"}}>
        <Modal.Header closeButton>
          <Modal.Title style={{fontFamily:"font2"}}>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this booking?
        </Modal.Body>
        <Modal.Footer>
          <Button className="button-19" variant="primary" onClick={handleCloseModal} style={{margin:"5px"}}>
            No, keep it
          </Button>
          <Button className="button-21" variant="danger" onClick={handleConfirmCancel} style={{margin:"5px"}}>
            Yes, cancel it
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyBooking;
