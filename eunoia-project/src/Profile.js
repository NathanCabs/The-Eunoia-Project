import React, { useState, useEffect } from 'react';
import NavigationBar from './NavigationBar';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import api from './Axios';
import './Login.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

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
        <center>
          <Container className="homeBackground" style={{fontFamily:"font1", marginTop:"10%"}}>
            <FontAwesomeIcon icon={faCircleNotch} spin style={{fontSize:"120px", marginBottom:"10px", color:"#8F87F1"}}/>
            <p>Loading profile...</p>
          </Container>
        </center>
      </div>
    );
  }

  return (
    <div className="homeBackground" fluid>
      <NavigationBar />
      <Container style={{ width:"100%", paddingTop:"1.5rem", userSelect:"none" }}>
        <Row>
          <Col>
          <h2 className="text-center mb-4" style={{fontFamily:"font2"}}>Profile</h2>
          <span style={{fontFamily:"font1"}}>
            <Form onSubmit={handleSave} style={{justifyContent:"center"}}>
              <Form.Group controlId="username" className="mb-3" style={{display:"grid",alignItems: "center",alignContent: "center",justifyContent: "center"}}>
    
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text"
                  name="username"
                  className="editProfileInput"
                  value={profile.username}
                  onChange={handleChange}
                  readOnly={!editing}
                  style={editing ? {backgroundColor:"white"} : {backgroundColor:"#eee"}}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3" style={{display:"grid",alignItems: "center",alignContent: "center",justifyContent: "center"}}>
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email"
                  name="email"
                  className="editProfileInput"
                  value={profile.email}
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3" style={{display:"grid",alignItems: "center",alignContent: "center",justifyContent: "center"}}>
                <Form.Label>Password</Form.Label>
                <Form.Control 
                  type="password"
                  name="password"
                  className="editProfileInput"
                  value={profile.password}
                  onChange={handleChange}
                  readOnly={!editing}
                  style={editing ? {backgroundColor:"white"} : {backgroundColor:"#eee"}}
                />
              </Form.Group>
              {editing ? (
                <div style={{display:"flex", justifyContent: "center"}}>
                  <Button variant="secondary" className="button-20" onClick={handleCancel} style={{width:"auto", marginTop:"10px"}}>Cancel</Button>
                  <Button type="submit" className="me-2 button-19" style={{marginLeft:"20px", width:"auto", marginTop:"10px"}}>Save Changes</Button>
                </div>
              ) : (
                <div style={{display:"grid", justifyContent: "center"}}>
                  <Button className="button-19" variant="primary" onClick={() => setEditing(true)} style={{width:"auto", marginTop:"10px"}}>Edit Profile</Button>
                </div>
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
