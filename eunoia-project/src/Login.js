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
        console.log(formData); // Log form data for debugging
    
        // Send data to the Spring Boot backend
        try {
          const response = await fetch("http://localhost:6543/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", //request token 
            },
            body: JSON.stringify(formData), //send form data as json
          });
          
          const result = await response.json();
          console.log(result);

          if (result.token) {
            localStorage.setItem("authToken", result.token); // Store the token in localStorage
            alert("Login successful!"); // Show success message
            if (result.role === "ADMIN") {
              navigate("/admin"); // Redirect to admin dashboard
            } else {
                navigate("/home"); // Redirect to landing page for regular users
            }
            } else {
                alert("Invalid email or password."); // Show error message
            }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert(error.message || "Error submitting form."); // Show error message
            }
        };
  return (
    <center>
    <div className="container-md" style={{alignContent:"center", display:"grid", minHeight:"90vh"}}>
      <div>
        <img width={150} height={150} src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
        <h2>Log in to your account</h2>
      </div>

      <div>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <label for="email">Email address</label>
            <div>
              <input type="email" name="email" id="email" placeholder="Email" autocomplete="email" value={formData.email} onChange={handleChange} required/>
            </div>
          </div>

          <div>
            <div>
              <label for="password">Password</label>
            </div>
            <div>
              <input type="password" name="password" id="password" placeholder="Password" autocomplete="current-password" value={formData.password} onChange={handleChange} required/>
            </div>
            <div>
                <a href="/forgot_password">Forgot password?</a>
                <br></br>
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
