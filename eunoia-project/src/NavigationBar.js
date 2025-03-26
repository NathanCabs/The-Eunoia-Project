import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import NavLink
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import './Login.scss';

const NavigationBar = () => {
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    const activeState = ({ isActive }) => ({
        color: isActive ? "white" : "",
        fontWeight: isActive ? "bold" : "",
        padding: isActive ? "10px" : "",
        backgroundColor: isActive ? "#3674B5" : "",
        borderRadius: isActive ? "25px" : "",
    });

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("recommendedProfessional");
        localStorage.removeItem("username");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("password");
        alert("You have been logged out.");
        navigate("/");
    };

    const eunoiaLogo = require('./assets/icons/eunoia_ver2.png');

    return (
        <Navbar collapseOnSelect expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/home" style={{color:"black", fontFamily:"font2"}}>
                    <img src={eunoiaLogo} width={40} height={40} alt="" style={{ margin: "5px" }} />
                    EUNOIA
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Form inline>
                            <Row>
                                {/* Search Bar Placeholder */}
                            </Row>
                        </Form>
                    </Nav>
                    <Nav style={{fontFamily:"font1", color:"black"}}>
                        {role === "ADMIN" && <NavLink to="/admin" style={activeState} className="nav-link">Admin</NavLink>}
                        <NavLink to="/professionals" style={activeState} className="nav-link">Recommended</NavLink>
                        <NavLink to="/all-pro" style={activeState} className="nav-link">Professionals</NavLink>
                        <NavLink 
                            to={`/my-booking/${localStorage.getItem("userId")}`} 
                            style={activeState} 
                            className="nav-link"
                        >
                            My Booking
                        </NavLink>
                        <NavLink to="/resources" style={activeState} className="nav-link">Resources</NavLink>
                        <NavLink to="/profile" style={activeState} className="nav-link">Profile</NavLink>
                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
