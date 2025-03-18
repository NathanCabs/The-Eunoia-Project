import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Profile() {
  const initialProfile = {
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("userEmail") || "",
    password: localStorage.getItem("password") || ""
  };

  const [profile, setProfile] = useState(initialProfile);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setProfile({
      username: localStorage.getItem("username") || "",
      email: localStorage.getItem("userEmail") || "",
      password: localStorage.getItem("password") || ""
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // Save changes (this would call your backend endpoint to update the profile)
  const handleSave = async (e) => {
    e.preventDefault();
    // Assume a PUT request to /api/users/profile/update
    // On success, update localStorage accordingly
    // For demonstration, we'll just update localStorage directly:
    localStorage.setItem("username", profile.username);
    localStorage.setItem("userEmail", profile.email);
    localStorage.setItem("password", profile.password);
    alert("Profile updated successfully.");
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
    setProfile(initialProfile);
  };

  return (
    <div>
      <NavigationBar />
      <Container style={{ width:"100%", paddingTop:"1.5rem" }}>
        <Row>
          <Col>
            <h1>Profile</h1>
            <Form onSubmit={handleSave}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  readOnly={!editing}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email"
                  name="email"
                  value={profile.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  name="password"
                  value={profile.password}
                  onChange={handleChange}
                  readOnly={!editing}
                />
              </Form.Group>
              {editing ? (
                <div>
                  <Button variant="primary" type="submit" className="me-2">Save Changes</Button>
                  <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                </div>
              ) : (
                <Button variant="primary" onClick={() => setEditing(true)}>Edit Profile</Button>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
