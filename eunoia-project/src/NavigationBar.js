import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const handleLogout = () => {
    // Remove the JWT token from localStorage
    localStorage.removeItem("authToken");

    // Optionally, redirect to the login page
    alert("You have been logged out.");
};


const NavigationBar = () => {
    const activeState = ({ isActive }) => {
        return {
          color: isActive ? "#82060D" : "",
          fontWeight: isActive ? "bold" : ""
        };
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
          <Navbar.Brand href="/home"><img src='../sample.jpg' width={30} height={30}/>Eunoia</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Form inline>
                    <Row>
                    <Col xs="auto">
                        <Form.Control
                        type="text"
                        placeholder="Search"
                        className=" mr-sm-2"
                        />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit">Submit</Button>
                    </Col>
                    </Row>
                </Form>
            </Nav>
            <Nav>
                <Nav.Link href="/create">+ Create</Nav.Link>
                <Nav.Link href="/professionals">Professionals</Nav.Link>
                <Nav.Link href="/resources">Resources</Nav.Link>
                <Nav.Link href="/message">Message</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}


export default NavigationBar;