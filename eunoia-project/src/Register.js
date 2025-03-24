import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import './Login.scss';

function Register() {
  const navigate = useNavigate();
  
  // State to track selected role; default to "USER"
  const [role, setRole] = useState("USER");
  // State to control modal visibility
  const [showModal, setShowModal] = useState(true);
  
  // State objects for form data for user and professional
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [professionalData, setProfessionalData] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  // Handle changes in role selection (radio buttons in modal)
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };
  
  // Close the modal when the confirm button is clicked
  const handleModalConfirm = () => {
    setShowModal(false);
  };

  // Handlers for form field changes for each role
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission; sends data to the corresponding endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (role === "USER") {
      try {
        const response = await fetch("https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        if (!response.ok) {
          throw new Error("User registration failed");
        }
        const result = await response.json();
        alert("User registered successfully!");
        navigate("/");
      } catch (error) {
        alert("Error: " + error.message);
      }
    } else if (role === "PROFESSIONAL") {
      try {
        const response = await fetch("https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/register/professional", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(professionalData),
        });
        if (!response.ok) {
          throw new Error("Professional registration failed");
        }
        const result = await response.text();
        alert(result);
        navigate("/");
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  const boyIcon = require('./assets/icons/boy.png');
  const professionalIcon = require('./assets/icons/business-woman.png');
  const eunoiaLogo = require('./assets/icons/eunoia_ver2.png');

  return (
    <div className='registerBackground'>
      {/* Role selection modal */}
      <Modal show={showModal} onHide={handleModalConfirm} backdrop="static" keyboard={false} style={{userSelect:"none"}}>
        <Modal.Header style={{background:"#0b5ed7"}}>
          <Modal.Title style={{color:"#fff", fontFamily:"font1"}}>Register As</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background:"#E0F4FF"}}>
          <Container class="grid-wrapper grid-col-auto">
            <Row>
              <Col xs={6}>
              <center>
                  <label for="radio-card-1" class="radio-card">
                    <input
                    name="radio-card"
                    id="radio-card-1"
                    type="radio"
                    value="USER"
                    checked={role === "USER"}
                    onChange={handleRoleChange}/>
                    <div class="card-content-wrapper">
                      <span class="check-icon"></span>
                      <div class="card-content">
                        <Image
                          width={200}
                          height={200}
                          src={boyIcon}
                          alt="User Icon"
                          fluid
                        />
                        <h2>User</h2>
                        <h5>Experience Eunoia with others</h5>
                      </div>
                    </div>
                  </label>
                </center>
                </Col>
                <Col xs={6}>
                <center>
                <label for="radio-card-2" class="radio-card">
                  <input
                  name="radio-card"
                  id="radio-card-2"
                  type="radio"
                  value="PROFESSIONAL"
                  checked={role === "PROFESSIONAL"}
                  onChange={handleRoleChange}/>
                  <div class="card-content-wrapper">
                    <span class="check-icon"></span>
                    <div class="card-content">
                      <Image
                          width={200}
                          height={200}
                          src={professionalIcon}
                          alt="Professional Icon"
                          fluid
                        />
                      <h2>Professional</h2>
                      <h5>Offer your services to Eunoia</h5>
                    </div>
                  </div>
                </label>
                </center>
                </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer style={{background:"#E0F4FF"}}>
          <Button variant="primary" onClick={handleModalConfirm} className="registerRadioConfirm">Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* Registration Form */}
      <center>
        <Container className="container-md registerContainer" fluid>
          <Row className="justify-content-md-center">
            <Col lg={12} style={{display:"block"}}>
              <Image width={175} height={175} src={eunoiaLogo} alt="Eunoia Logo" style={{margin:"0px 30px 30px"}} fluid/>
              <h2 style={{fontFamily:"font2", marginBottom:"20px"}}>Register</h2>
            </Col>
            <Col md={7} lg={3}>
              <Form onSubmit={handleSubmit}>
                {role === "USER" ? (
                  <>
                    <Form.Group style={{width:"100%"}}>
                      <Form.Label>Username</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="username" 
                          placeholder="Username" 
                          value={userData.username} 
                          onChange={handleUserChange} 
                          required 
                        />
                    </Form.Group>
                    <Form.Group style={{width:"100%"}}>
                      <Form.Label>Email address</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          placeholder="Email" 
                          value={userData.email} 
                          onChange={handleUserChange} 
                          required 
                        />
                    </Form.Group>
                    <Form.Group style={{width:"100%"}}>
                      <Form.Label>Password</Form.Label>
                        <Form.Control  
                          type="password" 
                          name="password" 
                          placeholder="Password" 
                          value={userData.password} 
                          onChange={handleUserChange} 
                          required 
                        />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Form.Group style={{width:"100%"}}>
                      <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text" 
                          name="name" 
                          placeholder="Full Name" 
                          value={professionalData.name} 
                          onChange={handleProfessionalChange} 
                          required 
                        />
                    </Form.Group>
                    <Form.Group style={{width:"100%"}}>
                      <Form.Label>Email address</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email" 
                          placeholder="Email" 
                          value={professionalData.email} 
                          onChange={handleProfessionalChange} 
                          required 
                        />
                    </Form.Group>
                    <Form.Group style={{width:"100%"}}>
                      <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password" 
                          name="password" 
                          placeholder="Password" 
                          value={professionalData.password} 
                          onChange={handleProfessionalChange} 
                          required 
                        />
                    </Form.Group>
                  </>
                )}
                <Col xs={7} lg={10}>
                  <button className="registerButton" type="submit">Register</button>
                </Col>
              </Form>
              <div>
                <a href="/">Already have an account? Log in</a>
              </div>
            </Col>
          </Row>
        </Container>
      </center>
    </div>
  );
}

export default Register;


// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// function Register() {
//   const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         username: "",
//         email: "",
//         password: "",
//         role: "USER",
//       });

//       const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value, // Dynamically update the specific field in the state
//         }));
//     };
    
//       const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form behavior
//         console.log(formData); // Log form data for debugging
    
//         // Send data to the Spring Boot backend
//         try {
//           const response = await fetch("http://localhost:6543/api/register", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json", //request token 
//             },
//             body: JSON.stringify(formData), //send form data as json
//           });
    
//           if (!response.ok) {
//             throw new Error("Failed to submit form");
//           }
    
//           const result = await response.json();
//           console.log(result); // Log the response from the backend
//           alert("Registered successfully!");
//           navigate("/");
//         } catch (error) {
//           console.error("Error submitting form:", error);
//           alert("Error submitting form.");
//         }
//       };

//   return (
//     <center>
//     <div className="container-md" style={{alignContent:"center", display:"grid", minHeight:"90vh"}}>
//       <div>
//         <img width={150} height={150} src="../eunoia-icon.png" alt="Your Company"/>
//         <h2>Create your account</h2>
//       </div>

//       <div>
//         <form action="#" method="POST" onSubmit={handleSubmit}>
//           <div>
//             <label>Username</label>
//             <div>
//               <input type="text" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleChange} required/>
//             </div>
//           </div>
//           <div>
//             <label>Email address</label>
//             <div>
//               <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
//             </div>
//           </div>

//           <div>
//             <div>
//               <label>Password</label>
//             </div>
//             <div>
//               <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
//             </div>
//           </div>
//           <div>
//                 <a href="/">Already have an account? Log in</a>
//           </div>

//           <div>
//             <button type="submit">Register</button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </center>
//   );
// }

// export default Register;
