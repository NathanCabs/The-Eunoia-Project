import './Login.css';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Table } from 'react-bootstrap';
import api from './Axios';
import NavigationBar from './NavigationBar';

function Admin() {
  const [activeTab, setActiveTab] = useState("users");

  // States for each data set
  const [users, setUsers] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [bookings, setBookings] = useState([]);

  // States for loading & errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch("/api/admin/users", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (!response.ok) {
        throw new Error(`Error fetching users: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError(err.message || "An error occurred while fetching users.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Professionals
  const fetchProfessionals = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.get("/api/professionals", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setProfessionals(response.data);
    } catch (err) {
      console.error("Error fetching professionals:", err);
      setError(err.message || "An error occurred while fetching professionals.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Bookings (Admin)
  const fetchBookings = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.get("/api/bookings/admin", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setBookings(response.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(err.message || "An error occurred while fetching bookings.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data on activeTab change
  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    } else if (activeTab === "professionals") {
      fetchProfessionals();
    } else if (activeTab === "bookings") {
      fetchBookings();
    }
  }, [activeTab]);

  // Handler for deleting a professional
  const handleDeleteProfessional = async (professionalId) => {
    if (!window.confirm("Are you sure you want to delete this professional?")) {
      return;
    }
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.delete(`/api/professionals/${professionalId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        alert("Professional deleted successfully!");
        fetchProfessionals();
      } else {
        alert("Failed to delete professional.");
      }
    } catch (error) {
      console.error("Error deleting professional:", error);
      alert("Error deleting professional: " + error.message);
    }
  };

  // Table rendering functions
  const renderUsersTable = () => (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={user.id}>
            <td>{idx + 1}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderProfessionalsTable = () => (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Username</th>
          <th>Specialization</th>
          <th>Focus Area</th>
          <th>Years</th>
          <th>Qualification</th>
          <th>Location</th>
          <th>Availability</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {professionals.map((pro, idx) => (
          <tr key={pro.id}>
            <td>{idx + 1}</td>
            <td>{pro.name}</td>
            <td>{pro.email}</td>
            <td>{pro.username}</td>
            <td>{pro.specialization}</td>
            <td>{pro.focusArea}</td>
            <td>{pro.yearsOfExperience}</td>
            <td>{pro.qualification}</td>
            <td>{pro.location}</td>
            <td>{pro.availability}</td>
            <td>
              <button onClick={() => handleDeleteProfessional(pro.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  const renderBookingsTable = () => (
    <>
      <h4>Pending Bookings</h4>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Professional</th>
            <th>Date/Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings
            .filter(b => b.status === "PENDING")
            .map((booking, idx) => (
              <tr key={booking.id}>
                <td>{idx + 1}</td>
                <td>{booking.user?.username}</td>
                <td>{booking.professional?.name}</td>
                <td>{new Date(booking.bookDateTime).toLocaleString()}</td>
                <td>{booking.status}</td>
              </tr>
          ))}
        </tbody>
      </Table>
      <h4>Confirmed Bookings</h4>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Professional</th>
            <th>Date/Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings
            .filter(b => b.status === "CONFIRMED")
            .map((booking, idx) => (
              <tr key={booking.id}>
                <td>{idx + 1}</td>
                <td>{booking.user?.username}</td>
                <td>{booking.professional?.name}</td>
                <td>{new Date(booking.bookDateTime).toLocaleString()}</td>
                <td>{booking.status}</td>
              </tr>
          ))}
        </tbody>
      </Table>
    </>
  );

  return (
    <div>
    <NavigationBar />
    <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
      <Row>
        <Col style={{ paddingBottom: "1.5rem" }}>
          <h1>Admin Dashboard</h1>
        </Col>
      </Row>
      {/* Nav Tabs */}
      <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
        <Nav.Item>
          <Nav.Link eventKey="users">Users</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="professionals">Professionals</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="bookings">Bookings</Nav.Link>
        </Nav.Item>
      </Nav>
      <Row className="mt-4">
        <Col>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {!loading && !error && (
            <>
              {activeTab === "users" && renderUsersTable()}
              {activeTab === "professionals" && renderProfessionalsTable()}
              {activeTab === "bookings" && renderBookingsTable()}
            </>
          )}
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default Admin;



// import './Login.css';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { useEffect, useState } from 'react';
// import api from './Axios';

// function Admin() {

//     const [users, setUsers] = useState([]);
  
//     useEffect(() => {
//         const loadUsers = async () => {
//             const token = localStorage.getItem("authToken");
//             console.log("Fetching users...");
        
//             try {

//                 const headers = {
//                     "Authorization": `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 };
        
//                 console.log("Request Headers:", headers);  // 🔍 Check size
//                 const response = await fetch("/api/admin/users", {
//                     headers: {
//                         "Authorization": `Bearer ${token}`,
//                         "Content-Type": "application/json"  // Add this for safety
//                     },
//                 });
        
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! Status: ${response.status}`);
//                 }
        
//                 const data = await response.json();  // ✅ Convert response to JSON
//                 console.log("Users fetched:", data);
//                 setUsers(data);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };        
//       loadUsers();
//     }, []);

//     return(
//         <div fluid>
//             <Container style={{width:"100%", paddingTop:"1.5rem"}}>
//                 <Row>
//                     <Col style={{paddingBottom:"1.5rem"}}>
//                         <h1>Admin</h1>
//                     </Col>
//                 </Row>
//                 <Row>
//                     <Col>
//                     <table className="table border shadow">
//                         <thead>
//                             <tr>
//                             <th scope="col">#</th>
//                             <th scope="col">Email</th>
//                             <th scope="col">Username</th>
//                             <th scope="col">Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {
//                                 users.map((user,index)=>(
//                                     <tr>
//                                     <th scope="row" key={index}>{index + 1}</th>
//                                     <td>{user.email}</td>
//                                     <td>{user.username}</td>
//                                     </tr>
//                                 ))
//                             }
//                         </tbody>
//                     </table>
//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     )
// }

// export default Admin;