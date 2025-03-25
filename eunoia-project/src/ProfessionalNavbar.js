import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './Login.scss';

const ProfessionalNavbar = () => {
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
    <Navbar collapseOnSelect expand="lg" style={{background:"transparent",backgroundColor: "transparent"}}>
      <Container >
        <Navbar.Brand onClick={() => navigate("/professional-booking")} style={{color:"black", fontFamily:"font2", cursor:"pointer"}}><img src={eunoiaLogo} width={40} height={40} alt="" style={{ margin: "5px" }} />
          EUNOIA
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
          <Nav style={{fontFamily:"font1", color:"black"}}>
            <Nav.Link onClick={() => navigate("/professional-booking")}>Bookings</Nav.Link>
            <Nav.Link onClick={() => navigate("/professional-profile")}>Profile</Nav.Link>
          </Nav>
          <Nav style={{fontFamily:"font1", color:"black"}}>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ProfessionalNavbar;
