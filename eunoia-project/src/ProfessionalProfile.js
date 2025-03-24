import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import ProfessionalNavbar from './ProfessionalNavbar';
import api from './Axios';

function ProfessionalProfile() {
  const daysOfWeek = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
  const [profile, setProfile] = useState({
    name: '',
    username: '',
    password: '',
    specialization: '',
    focusArea: '',
    yearsOfExperience: 0,
    qualification: '',
    email: '',
    location: '',
    availability: ''
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  // Fetch professional's profile based on their ID stored in localStorage.
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const professionalId = localStorage.getItem("userId");
      const response = await api.get(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/professionals/${professionalId}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      if (response.ok || response.status === 200) {
        const data = response.data;
        setProfile(data);
      } else {
        alert("Failed to fetch profile.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      alert("Error fetching profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.put("https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/professionals/profile/update", profile, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      });
      if (response.ok || response.status === 200) {
        alert("Profile updated successfully.");
        setEditing(false);
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
        <ProfessionalNavbar />
        <Container className="mt-4">
          <p>Loading profile...</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <ProfessionalNavbar />
      <Container style={{ paddingTop: "1.5rem" }}>
        <Row>
          <Col>
            <h1>Professional Profile</h1>
            <Form onSubmit={handleSave}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleChange} 
                  readOnly={!editing}
                />
              </Form.Group>
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
              <Form.Group controlId="specialization" className="mb-3">
                <Form.Label>Specialization</Form.Label>
                <Form.Control 
                  type="text" 
                  name="specialization" 
                  value={profile.specialization} 
                  onChange={handleChange} 
                  readOnly={!editing}
                />
              </Form.Group>
              <Form.Group controlId="focusArea" className="mb-3">
                <Form.Label>Focus Area</Form.Label>
                <Form.Control 
                  type="text" 
                  name="focusArea" 
                  value={profile.focusArea} 
                  onChange={handleChange} 
                  readOnly={!editing}
                />
              </Form.Group>
              <Form.Group controlId="yearsOfExperience" className="mb-3">
                <Form.Label>Years of Experience</Form.Label>
                <Form.Control 
                  type="number" 
                  name="yearsOfExperience" 
                  value={profile.yearsOfExperience} 
                  onChange={handleChange} 
                  readOnly={!editing}
                />
              </Form.Group>
              <Form.Group controlId="qualification" className="mb-3">
                <Form.Label>Qualification</Form.Label>
                <Form.Control 
                  type="text" 
                  name="qualification" 
                  value={profile.qualification} 
                  onChange={handleChange} 
                  readOnly={!editing}
                />
              </Form.Group>
              <Form.Group controlId="location" className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control 
                  type="text" 
                  name="location" 
                  value={profile.location} 
                  onChange={handleChange} 
                  readOnly={!editing}
                />
              </Form.Group>
              {/* Inside your form */}
              <Form.Group controlId="availability" className="mb-3">
                <Form.Label>Available Days</Form.Label>
                <div>
                  {daysOfWeek.map((day) => (
                    <Form.Check 
                      inline
                      key={day}
                      type="checkbox"
                      label={day}
                      name="availability"
                      value={day}
                      checked={profile.availability && profile.availability.includes(day)}
                      onChange={(e) => {
                        let newAvailability = profile.availability || [];
                        if (e.target.checked) {
                          newAvailability = [...newAvailability, day];
                        } else {
                          newAvailability = newAvailability.filter(d => d !== day);
                        }
                        setProfile(prev => ({ ...prev, availability: newAvailability }));
                      }}
                    />
                  ))}
                </div>
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

export default ProfessionalProfile;
