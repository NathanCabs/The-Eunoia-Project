import './Login.scss';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Table, Button, Modal, Form } from 'react-bootstrap';
import api from './Axios';
import NavigationBar from './NavigationBar';
import { ResourceContext } from './ResourceContext';
import { useContext } from 'react';

function Admin() {
  const { resourceList, addResource, editResource, deleteResource } = useContext(ResourceContext);
  const [activeTab, setActiveTab] = useState("users");

  // States for each data set
  const [users, setUsers] = useState([]);
  const [professionals, setProfessionals] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  // States for loading & errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [editMode, setEditMode] = useState(false);
  const [currentResourceIndex, setCurrentResourceIndex] = useState(null);
  const [newResource, setNewResource] = useState({ title: "", mainLink: "", subLink: "" });
  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResource((prev) => ({ ...prev, [name]: value }));
};

  const handleSaveResource = () => {
      if (!newResource.title || !newResource.mainLink) {
          alert("Please fill in all required fields.");
          return;
      }

      if (editMode) {
          editResource(currentResourceIndex, newResource); // Update resource
      } else {
          addResource(newResource); // Add new resource
      }

      setShowModal(false);
      setEditMode(false);
      setNewResource({ title: "", mainLink: "", subLink: "" });
  };

  const handleEditResource = (index) => {
      setCurrentResourceIndex(index);
      setNewResource(resourceList[index]);
      setEditMode(true);
      setShowModal(true);
  };

  // Fetch Users
  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.get("/api/admin/users/all", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (err) {
      console.error("Error fetching professionals:", err);
      setError(err.message || "An error occurred while fetching professionals.");
    } finally {
      setLoading(false);
    }
  };

  // const fetchUsers = async () => {
  //   setLoading(true);
  //   setError("");
  //   const token = localStorage.getItem("authToken");
  //   try {
  //     const response = await fetch("/api/admin/users", {
  //       headers: {
  //         "Authorization": `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       }
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Error fetching users: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     setUsers(data);
  //   } catch (err) {
  //     console.error("Error fetching users:", err);
  //     setError(err.message || "An error occurred while fetching users.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  

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
  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    const token = localStorage.getItem("authToken");
    try {
      const response = await api.delete(`/api/admin/users/${userId}/delete`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (response.status === 204) {
        alert("User deleted successfully!");
        fetchUsers();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user: " + error.message);
    }
  };

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
      if (response.status === 204) {
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

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowConfirmModal(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBooking) return;
    try {
      const token = localStorage.getItem("authToken");
      const response = await api.delete(`http://localhost:6543/api/bookings/${selectedBooking.id}`, {
        headers: {
          "Authorization": "Bearer " + token
        }
      });
      // Assuming a successful deletion returns HTTP 204 or 200
      if (response.status === 204 || response.status === 200) {
        alert("Booking cancelled successfully!");
        setShowConfirmModal(false);
        fetchBookings();
      } else {
        alert("Failed to cancel booking.");
      }
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("An error occurred while cancelling the booking.");
    }
  };

    const handleCloseModal = () => {
      setShowConfirmModal(false);
      setSelectedBooking(null);
    };

  // Table rendering functions
  const renderUsersTable = () => (
    <Table bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Email</th>
          <th>Username</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, idx) => (
          <tr key={user.id}>
            <td>{idx + 1}</td>
            <td>{user.email}</td>
            <td>{user.username}</td>
            <td>
              <button onClick={() => handleDeleteUser(user.id)}>
                Delete
              </button>
            </td>
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
            <td>{pro.availability + " "}</td>
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
      <h4>Confirmed Bookings</h4>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Professional</th>
            <th>Date/Time</th>
            <th>Status</th>
            <th>Action</th>
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
                <td>
                <Button variant="danger" onClick={() => handleCancelClick(booking)}>
                      Cancel
                    </Button>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>
      <h4>Pending Bookings</h4>
      <Table bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Professional</th>
            <th>Date/Time</th>
            <th>Status</th>
            <th>Action</th>
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
                <td>
                    <Button variant="danger" onClick={() => handleCancelClick(booking)}>
                      Cancel
                    </Button>
                </td>
              </tr>
          ))}
        </tbody>
      </Table>
    </>
  );

  const renderResourcesTable =() => {
    return (
    <>
      <h4>Manage Mental Health Resources</h4>
        <Button onClick={() => { setEditMode(false); setShowModal(true); }} variant="primary" className="mb-3">
          Add New Resource
        </Button>
        <Table bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Main Link</th>
              <th>Sub Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resourceList.map((resource, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{resource.title}</td>
              <td><a href={resource.mainLink} target="_blank" rel="noopener noreferrer">Visit</a></td>
              <td>{resource.subLink ? <a href={resource.subLink} target="_blank" rel="noopener noreferrer">More Info</a> : "N/A"}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditResource(index)}>Edit</Button>
                <Button variant="danger" size="sm" onClick={() => deleteResource(index)}>Delete</Button>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      </>
    );
  }

  return (
    <div>
    <NavigationBar />
    <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
      <Row>
        <Col style={{paddingBottom:"1.5rem"}}>
          <h2 className="text-center mb-4" style={{fontFamily:"font2"}}>Admin Dashboard</h2>
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
        <Nav.Item>
            <Nav.Link eventKey="resources">Manage Resources</Nav.Link>
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
              {activeTab === "resources" && renderResourcesTable()}
            </>
          )}
        </Col>
      </Row>
    </Container>

    {/* Confirm Cancellation Modal */}
    <Modal show={showConfirmModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Cancellation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to cancel this booking?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            No, keep it
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            Yes, cancel it
          </Button>
        </Modal.Footer>
      </Modal>

    {/* Add/Edit Modal */}
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Edit Resource" : "Add New Resource"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={newResource.title} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Main Link</Form.Label>
                            <Form.Control type="url" name="mainLink" value={newResource.mainLink} onChange={handleInputChange} required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Sub Link (Optional)</Form.Label>
                            <Form.Control type="url" name="subLink" value={newResource.subLink} onChange={handleInputChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveResource}>
                        {editMode ? "Save Changes" : "Add Resource"}
                    </Button>
                </Modal.Footer>
            </Modal>
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