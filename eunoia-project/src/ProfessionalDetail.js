// ProfessionalDetail.js
import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { Container, Row, Col, Button } from "react-bootstrap";
import BookingModal from "./BookingModal";
import './Login.scss';

function ProfessionalDetail() {
  const { id } = useParams();
  const [professional, setProfessional] = useState(null);
  const location = useLocation();
  const from = location.state?.from || "allpro";
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const fetchProfessional = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/professionals/${id}`, {
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
        <Container className="mt-4" style={{fontFamily:"font1"}}>
          <p>Loading professional details...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationBar />
        <Container className="mt-4" style={{fontFamily:"font1"}}>
          <p>{error}</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <Container style={{ width: "100%", paddingTop: "1.5rem", fontFamily:"font1" }}>
        <Row>
          <Col style={{ paddingBottom: "1.5rem", fontFamily:"font1"}}>
          <Link to={from === "allpro" ? "/all-pro" : "/professionals"}>Back</Link>
            <h1 style={{fontFamily:"font2"}}>{professional.name}</h1>
            <h4>{professional.specialization}</h4>
            <p><strong>Focus Area:</strong> {professional.focusArea}</p>
            <p><strong>Years of Experience:</strong> {professional.yearsOfExperience}</p>
            <p><strong>Qualification:</strong> {professional.qualification}</p>
            <p><strong>Location:</strong> {professional.location}</p>
            <p><strong>Availability:</strong> {professional.availability + " "}</p>
            <Button variant="primary" onClick={() => setShowBookingModal(true)}>
              Book Now
            </Button>
            {professional && (
            <BookingModal 
            show={showBookingModal} 
            handleClose={() => setShowBookingModal(null)} 
            professionalId={professional.id} 
            availableDays={professional.availability} 
          />
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfessionalDetail;
