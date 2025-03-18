import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  
  // Track which role the user is logging in as.
  const [loginRole, setLoginRole] = useState("USER");
  
  // Form state for email and password.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle role selection.
  const handleRoleChange = (e) => {
    setLoginRole(e.target.value);
  };

  // Update form fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit login form.
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let endpoint = "";
      if (loginRole === "USER") {
        endpoint = "http://localhost:6543/api/login";
      } else if (loginRole === "PROFESSIONAL") {
        endpoint = "http://localhost:6543/api/login/professional";
      }
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "Invalid email or password.");
      }
      
      // Store token and other details.
      if (result.token && result.userId) {
        localStorage.setItem("authToken", result.token);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("role", result.role);
        localStorage.setItem("username", result.username);
        localStorage.setItem("userEmail", result.userEmail);

      } else {
        throw new Error("No token received from server.");
      }
      
      alert("Login successful!");
      
      // Redirect user based on role.
      if (result.role === "ADMIN") {
        navigate("/admin");
      } else if (result.role === "PROFESSIONAL") {
        navigate("/professional-booking");
      } else {
        // For regular users, check if a recommended professional exists.
        try {
          const recResponse = await fetch("http://localhost:6543/api/professionals/recommended", {
            method: "GET",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": "Bearer " + result.token
            }
          });
          if (recResponse.ok) {
            // This should return an array of professionals
            const recommendedList = await recResponse.json();
            // If the list is not empty, store the first item’s specialization in localStorage
            if (recommendedList && recommendedList.length > 0) {
              localStorage.setItem("recommendedProfessional", recommendedList[0].specialization);
            }
            console.log(localStorage.getItem("recommendedProfessional"));
            navigate("/home");
          } else {
            // If not found, then user hasn't taken the test yet.
            navigate("/taketest");
          }
        } catch (err) {
          console.error("Error checking recommended professional:", err);
          navigate("/taketest");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message || "Error submitting form.");
    }
  };

  return (
    <center>
      <div className="container-md" style={{ alignContent: "center", display: "grid", minHeight: "90vh" }}>
        <div>
          <img width={150} height={150} src="../eunoia-icon.png" alt="Your Company" />
          <h2>Log in to your account</h2>
        </div>

        <div>
          {/* Role selection for login */}
          <div>
            <label>
              <input 
                type="radio" 
                value="USER" 
                checked={loginRole === "USER"} 
                onChange={handleRoleChange} 
              />
              User
            </label>
            <label>
              <input 
                type="radio" 
                value="PROFESSIONAL" 
                checked={loginRole === "PROFESSIONAL"} 
                onChange={handleRoleChange} 
              />
              Professional
            </label>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email address</label>
              <div>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div>
              <div>
                <label>Password</label>
              </div>
              <div>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  placeholder="Password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div>
                <a href="/register">Don't have an account? Create one</a>
              </div>
            </div>

            <div>
              <button type="submit">Log In</button>
            </div>
          </form>
        </div>
      </div>
    </center>
  );
}

export default Login;


// import './Login.css';
// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';

// function Login() {
//   const navigate = useNavigate();
  
//   // Track which role the user is logging in as.
//   const [loginRole, setLoginRole] = useState("USER");
  
//   // Form state for email and password.
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // Handle role selection.
//   const handleRoleChange = (e) => {
//     setLoginRole(e.target.value);
//   };

//   // Update form fields.
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Submit login form.
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       let endpoint = "";
//       if (loginRole === "USER") {
//         endpoint = "http://localhost:6543/api/login";
//       } else if (loginRole === "PROFESSIONAL") {
//         endpoint = "http://localhost:6543/api/login/professional";
//       }
      
//       const response = await fetch(endpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//         }),
//       });
      
//       const result = await response.json();
      
//       if (!response.ok) {
//         throw new Error(result.message || "Invalid email or password.");
//       }
      
//       // Store token and other details.
//       if (result.token && result.userId) {
//         localStorage.setItem("authToken", result.token);
//         localStorage.setItem("userId", result.userId);
//         localStorage.setItem("role", result.role);
//       } else {
//         throw new Error("No token received from server.");
//       }
      
//       alert("Login successful!");
      
//       // Redirect user based on role.
//       if (result.role === "ADMIN") {
//         navigate("/admin");
//       } else if (result.role === "PROFESSIONAL") {
//         navigate("/professional-dashboard");
//       } else {
//         navigate("/home");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert(error.message || "Error submitting form.");
//     }
//   };

//   return (
//     <center>
//       <div className="container-md" style={{ alignContent: "center", display: "grid", minHeight: "90vh" }}>
//         <div>
//           <img width={150} height={150} src="../eunoia-icon.png" alt="Your Company" />
//           <h2>Log in to your account</h2>
//         </div>

//         <div>
//           {/* Role selection for login */}
//           <div>
//             <label>
//               <input 
//                 type="radio" 
//                 value="USER" 
//                 checked={loginRole === "USER"} 
//                 onChange={handleRoleChange} 
//               />
//               User
//             </label>
//             <label>
//               <input 
//                 type="radio" 
//                 value="PROFESSIONAL" 
//                 checked={loginRole === "PROFESSIONAL"} 
//                 onChange={handleRoleChange} 
//               />
//               Professional
//             </label>
//           </div>
//           <form onSubmit={handleSubmit}>
//             <div>
//               <label>Email address</label>
//               <div>
//                 <input 
//                   type="email" 
//                   name="email" 
//                   id="email" 
//                   placeholder="Email" 
//                   value={formData.email} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>
//             </div>

//             <div>
//               <div>
//                 <label>Password</label>
//               </div>
//               <div>
//                 <input 
//                   type="password" 
//                   name="password" 
//                   id="password" 
//                   placeholder="Password" 
//                   value={formData.password} 
//                   onChange={handleChange} 
//                   required 
//                 />
//               </div>
//               <div>
//                 <a href="/register">Don't have an account? Create one</a>
//               </div>
//             </div>

//             <div>
//               <button type="submit">Log In</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </center>
//   );
// }

// export default Login;