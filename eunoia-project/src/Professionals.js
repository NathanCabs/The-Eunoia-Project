// Professionals.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import BookingModal from "./BookingModal";
import './Login.scss';

const Professionals = () => {
  const navigate = useNavigate();
  const [professionals, setProfessionals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingProfessional, setBookingProfessional] = useState(null);

  // Fetch recommended professionals from backend
  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch("http://localhost:6543/api/professionals/recommended", {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        });
        if (response.ok) {
          const data = await response.json();
          setProfessionals(data);
        } else {
          setError("No recommended professionals found. Please complete the assessment test.");
        }
      } catch (err) {
        console.error("Error fetching professionals:", err);
        setError("An error occurred while fetching professionals.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfessionals();
  }, []);

  // Navigate to ProfessionalDetail when card is clicked
  const handleCardClick = (id) => {
    navigate(`/professional-detail/${id}`);
  };

  if (loading) {
    return (
      <div>
        <NavigationBar />
        <Container className="homeBackground" style={{fontFamily:"font1"}}>
          <p>Loading professionals...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavigationBar />
        <Container className="homeBackground">
          <p>{error}</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="homeBackground" fluid>
      <NavigationBar />
      <Container className="mt-4">
        <h2 className="text-center mb-4" style={{fontFamily:"font2", userSelect:"none"}}>Professionals</h2>
        <Row className="g-4">
          {professionals.map((pro) => (
            <Col key={pro.id} xs={12} md={6} lg={4}>
              <Card
                className="shadow-sm"
                onClick={() => handleCardClick(pro.id)}
                style={{ cursor: "pointer" }}
              >
                <Row className="g-0 align-items-center">
                  <Col xs={12} style={{border:"solid 3px #3674B5", borderRadius:"6px"}}>
                    <Card.Body >
                      <Card.Title style={{fontFamily:"font1"}}>{pro.name}</Card.Title>
                      <Card.Subtitle className="text-muted" style={{fontFamily:"font1"}}>{pro.specialization}</Card.Subtitle>
                      <Button
                        variant="primary"
                        className="mt-2 button-19"
                        onClick={(e) => {
                          e.stopPropagation();
                          setBookingProfessional(pro);
                        }}
                      >
                        Book
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
        {bookingProfessional && (
          <BookingModal 
            show={true} 
            handleClose={() => setBookingProfessional(null)} 
            professionalId={bookingProfessional.id} 
            availableDays={bookingProfessional.availability} 
          />
        )}
      </Container>
    </div>
  );
};

export default Professionals;
