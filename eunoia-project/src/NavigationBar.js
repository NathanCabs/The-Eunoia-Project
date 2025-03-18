import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
    const navigate = useNavigate();
    const activeState = ({ isActive }) => {
        return {
          color: isActive ? "#82060D" : "",
          fontWeight: isActive ? "bold" : ""
        };
      };

      const handleLogout = () => {
        // Remove the JWT token from localStorage
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("role");
        localStorage.removeItem("recommendedProfessional");
        localStorage.removeItem("username");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("password");
        // Optionally, redirect to the login page
        alert("You have been logged out.");
        navigate("/");
    };
    return (
        /*  Search bar
            Profile icon
            Notification?
            Messenger?
        
        <nav className="navbar">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                    <img src="#" alt="Eunoia logo" />
                    Eunoia
                </a>
                <ul className="nav-links">
                    <NavLink to="/create" style={activeState}><a>+ Create</a></NavLink>
                    <NavLink to="/" style={activeState}><a>Notification</a></NavLink>
                    <NavLink to="/" style={activeState}><a>Message</a></NavLink>
                    <NavLink to="/profile" style={activeState}><a>Profile</a></NavLink>
                </ul>
            </div>
        </nav>
        */
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/home"><img src='../eunoia-icon.png' width={40} height={40} alt=""/>Eunoia</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Form inline>
                    <Row>
                    {/* <Col xs="auto">
                        <Form.Control
                        type="text"
                        placeholder="Search"
                        className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Search</Button>
                    </Col> */}
                    </Row>
                </Form>
            </Nav>
            <Nav>
                <Nav.Link href="/professionals" style={{activeState}}>Professionals</Nav.Link>
                {/* My Booking tab: uses the logged in user's id from localStorage */}
                <Nav.Link 
                          onClick={() => navigate(`/my-booking/${localStorage.getItem("userId")}`)}
                          style={{activeState}}
                        >
                          My Booking
                </Nav.Link>
                <Nav.Link href="/resources" style={{activeState}}>Resources</Nav.Link>
                <Nav.Link href="/profile" style={{activeState}}>Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}


export default NavigationBar;