import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Register() {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER",
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
          const response = await fetch("http://localhost:6543/api/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", //request token 
            },
            body: JSON.stringify(formData), //send form data as json
          });
    
          if (!response.ok) {
            throw new Error("Failed to submit form");
          }
    
          const result = await response.json();
          console.log(result); // Log the response from the backend
          alert("Form submitted successfully!");
          navigate("/");
        } catch (error) {
          console.error("Error submitting form:", error);
          alert("Error submitting form.");
        }
      };

  return (
    <center>
    <div className="container-md" style={{alignContent:"center", display:"grid", minHeight:"90vh"}}>
      <div>
        <img width={150} height={150} src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
        <h2>Create your account</h2>
      </div>

      <div>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <label for="username">Username</label>
            <div>
              <input type="username" name="username" id="username" placeholder="Username" autocomplete="username" value={formData.name} onChange={handleChange} required/>
            </div>
          </div>
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
          </div>
          <div>
                <a href="/">Already have an account? Log in</a>
          </div>

          <div>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </div>
    </center>
  );
}

export default Register;
