// Professionals.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import BookingModal from "./BookingModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import api from './Axios';
import './Login.scss';

const AllPro = () => {
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
        const response = await api.get("/api/professionals", {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setProfessionals(response.data);
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
    navigate(`/professional-detail/${id}`, { state: { from: "allpro" } });
  };

  if (loading) {
    return (
      <div>
        <NavigationBar />
        <center>
            <Container className="homeBackground" style={{fontFamily:"font1", marginTop:"10%"}}>
                <FontAwesomeIcon icon={faCircleNotch} spin style={{fontSize:"120px", marginBottom:"10px", color:"#8F87F1"}}/>
                <p>Loading professionals...</p>
            </Container>
        </center>
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

export default AllPro;
