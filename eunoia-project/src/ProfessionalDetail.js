// ProfessionalDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import BookingModal from "./BookingModal";

function ProfessionalDetail() {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:6543/api/professionals/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProfessional(data);
        } else {
          setError("Failed to load professional details.");
        }
      } catch (err) {
        console.error("Error fetching professional:", err);
        setError("An error occurred while fetching professional details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfessional();
  }, [id]);

  if (loading) {
    return (
      <div>
        <NavigationBar />
        <Container className="mt-4">
          <p>Loading professional details...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationBar />
        <Container className="mt-4">
          <p>{error}</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
        <Row>
          <Col style={{ paddingBottom: "1.5rem" }}>
          <Link to="/professionals">Back</Link>
            <h1>{professional.name}</h1>
            <h4>{professional.specialization}</h4>
            <p><strong>Focus Area:</strong> {professional.focusArea}</p>
            <p><strong>Years of Experience:</strong> {professional.yearsOfExperience}</p>
            <p><strong>Qualification:</strong> {professional.qualification}</p>
            <p><strong>Location:</strong> {professional.location}</p>
            <p><strong>Availability:</strong> {professional.availability}</p>
            <Button variant="primary" onClick={() => setShowBookingModal(true)}>
              Book Now
            </Button>
            <BookingModal 
              show={showBookingModal} 
              handleClose={() => setShowBookingModal(false)} 
              professionalId={professional.id} 
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfessionalDetail;
