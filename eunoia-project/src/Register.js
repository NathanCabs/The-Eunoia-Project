import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './Login.css';

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
        const response = await fetch("http://localhost:6543/api/register", {
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
        const response = await fetch("http://localhost:6543/api/register/professional", {
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

  return (
    <div>
      {/* Role selection modal */}
      <Modal show={showModal} onHide={handleModalConfirm} backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Select Registration Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label>
              <input
                type="radio"
                value="USER"
                checked={role === "USER"}
                onChange={handleRoleChange}
              />
              Register as User
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="PROFESSIONAL"
                checked={role === "PROFESSIONAL"}
                onChange={handleRoleChange}
              />
              Register as Professional
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>

      {/* Registration Form */}
      <center>
        <div className="container-md" style={{ alignContent: "center", display: "grid", minHeight: "90vh" }}>
          <div>
            <img width={150} height={150} src="../eunoia-icon.png" alt="Your Company" />
            <h2>Create your account</h2>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              {role === "USER" ? (
                <>
                  <div>
                    <label>Username</label>
                    <div>
                      <input 
                        type="text" 
                        name="username" 
                        placeholder="Username" 
                        value={userData.username} 
                        onChange={handleUserChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label>Email address</label>
                    <div>
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={userData.email} 
                        onChange={handleUserChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label>Password</label>
                    <div>
                      <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={userData.password} 
                        onChange={handleUserChange} 
                        required 
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label>Full Name</label>
                    <div>
                      <input 
                        type="text" 
                        name="name" 
                        placeholder="Full Name" 
                        value={professionalData.name} 
                        onChange={handleProfessionalChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label>Email address</label>
                    <div>
                      <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={professionalData.email} 
                        onChange={handleProfessionalChange} 
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label>Password</label>
                    <div>
                      <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={professionalData.password} 
                        onChange={handleProfessionalChange} 
                        required 
                      />
                    </div>
                  </div>
                </>
              )}
              <div>
                <button type="submit">Register</button>
              </div>
            </form>
            <div>
              <a href="/">Already have an account? Log in</a>
            </div>
          </div>
        </div>
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
