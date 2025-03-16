import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value, // Dynamically update the specific field in the state
        }));
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault(); // Prevent default form behavior
      console.log(formData); // Debugging
  
      try {
          const response = await fetch("http://localhost:6543/api/login", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({ 
                  email: formData.email, 
                  password: formData.password 
              }),
          });
  
          // Check if response is valid JSON
          const result = await response.json();
          console.log("Response from backend:", result); // Debugging
  
          if (!response.ok) {
              throw new Error(result.message || "Invalid email or password.");
          }
  
          // ✅ Make sure the token exists before storing
          if (result.token && result.userId) {
              localStorage.setItem("authToken", result.token);
              localStorage.setItem("userId", result.userId); // Save userId
              console.log("Stored userId:", result.userId);
          } else {
              throw new Error("No token received from server.");
          }
  
          alert("Login successful!"); 
  
          // ✅ Redirect user based on role
          if (result.role === "ADMIN") {
              navigate("/admin");
          } else {
              navigate("/home");
          }
  
      } catch (error) {
          console.error("Error submitting form:", error);
          alert(error.message || "Error submitting form.");
      }
  };
  
  return (
    <center>
    <div className="container-md" style={{alignContent:"center", display:"grid", minHeight:"90vh"}}>
      <div>
        <img width={150} height={150} src="../eunoia-icon.png" alt="Your Company"/>
        <h2>Log in to your account</h2>
      </div>

      <div>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <label>Email address</label>
            <div>
              <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} required/>
            </div>
          </div>

          <div>
            <div>
              <label>Password</label>
            </div>
            <div>
              <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div>
                {/* <a href="/forgot_password">Forgot password?</a> */}
                {/* <br></br> */}
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
