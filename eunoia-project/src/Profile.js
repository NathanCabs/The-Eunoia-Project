import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import api from './Axios';
import './Login.scss';

function Profile() {
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Fetch profile from backend GET /api/users/profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.get("/api/users/profile", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Error fetching profile information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.put("/api/users/profile/update", profile, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      if (response.status === 200) {
        alert("Profile updated successfully.");
        setEditing(false);
        fetchProfile();
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile: " + error.message);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    fetchProfile();
  };

  if (loading) {
    return (
      <div>
        <NavigationBar />
        <Container className="homeBackground">
          <p style={{fontFamily:"font1"}}>Loading profile...</p>
        </Container>
      </div>
    );
  }

  return (
    <div className="homeBackground" fluid>
      <NavigationBar />
      <Container style={{ width:"100%", paddingTop:"1.5rem" }}>
        <Row>
          <Col>
          <h2 className="text-center mb-4" style={{fontFamily:"font2"}}>Profile</h2>
          <span style={{fontFamily:"font1"}}>
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
          </span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
