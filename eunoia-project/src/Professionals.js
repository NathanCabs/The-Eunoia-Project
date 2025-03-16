import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegStar } from "@fortawesome/free-regular-svg-icons";
import NavigationBar from './NavigationBar';

// Sample professionals data
const professionals = [
    {
        id: 1,
        name: "Dr. Jane Doe",
        specialization: "Clinical Psychologist",
        rating: 4.5,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 2,
        name: "Dr. John Smith",
        specialization: "Therapist",
        rating: 5,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 3,
        name: "Dr. Emily Johnson",
        specialization: "Counseling Psychologist",
        rating: 3.5,
        image: "https://via.placeholder.com/150",
    },
    {
        id: 4,
        name: "Dr. Mark Wilson",
        specialization: "Behavioral Therapist",
        rating: 4,
        image: "https://via.placeholder.com/150",
    },
];

// Function to generate rating stars
const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-warning" />);
        } else if (rating >= i - 0.5) {
            stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-warning" />);
        } else {
            stars.push(<FontAwesomeIcon key={i} icon={faRegStar} className="text-warning" />);
        }
    }
    return stars;
};

const Professionals = () => {
    return (
        <div fluid>
        <NavigationBar />
        <Container className="mt-4">
            <h2 className="text-center mb-4">Meet Our Professionals</h2>
            <Row className="g-4">
                {professionals.map((pro) => (
                    <Col key={pro.id} xs={12} md={6} lg={4}>
                        <Card className="shadow-sm">
                            <Row className="g-0 align-items-center">
                                <Col xs={4} className="text-center">
                                    <Card.Img
                                        src={pro.image}
                                        alt={pro.name}
                                        className="rounded-circle p-2"
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    />
                                </Col>
                                <Col xs={8}>
                                    <Card.Body>
                                        <Card.Title>{pro.name}</Card.Title>
                                        <Card.Subtitle className="text-muted">{pro.specialization}</Card.Subtitle>
                                        <div className="mt-2">{renderStars(pro.rating)}</div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </div>
    );
};

export default Professionals;
