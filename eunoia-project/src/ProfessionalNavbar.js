import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ProfessionalNavbar = () => {
  const navigate = useNavigate();
  
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

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={() => navigate("/professional-booking")} style={{cursor: 'pointer'}}><img src='../eunoia-icon.png' width={40} height={40} alt=""/>
          Eunoia
        </Navbar.Brand>
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
            <Nav.Link onClick={() => navigate("/professional-booking")}>Bookings</Nav.Link>
            <Nav.Link onClick={() => navigate("/professional-profile")}>Profile</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ProfessionalNavbar;
