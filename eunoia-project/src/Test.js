import React, { useState } from 'react';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function Test() {
    const navigate = useNavigate();
  // Step control: 1 = demographics; 2 = assessment; 3 = result
  const [step, setStep] = useState(1);
  
  // Demographic info
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  
  // Define a list of questions (e.g., GHQ-12)
  const questions = [
    "Been able to concentrate on what you're doing?",          // Q1 (Positive)
    "Lost much sleep over worry?",                             // Q2 (Negative)
    "Felt that you were playing a useful part in things?",     // Q3 (Positive)
    "Felt capable of making decisions about things?",          // Q4 (Positive)
    "Felt constantly under strain?",                           // Q5 (Negative)
    "Felt you couldn't overcome your difficulties?",           // Q6 (Negative)
    "Been able to enjoy your normal day-to-day activities?",   // Q7 (Positive)
    "Been able to face up to your problems?",                  // Q8 (Positive)
    "Been feeling unhappy or depressed?",                      // Q9 (Negative)
    "Been losing confidence in yourself?",                     // Q10 (Negative)
    "Been thinking of yourself as a worthless person?",        // Q11 (Negative)
    "Been feeling reasonably happy, all things considered?"    // Q12 (Positive)
  ];
  
  // Array to store responses for each question (0 = Never, 1 = Sometimes, 2 = Frequently, 3 = Always)
  const [responses, setResponses] = useState(Array(questions.length).fill(null));
  
  // Track current question index
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Result state
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Options mapping
  const options = [
    { label: "Never", value: 0 },
    { label: "Sometimes", value: 1 },
    { label: "Frequently", value: 2 },
    { label: "Always", value: 3 }
  ];
  
  // Handler for demographics submission
  const handleDemographicsSubmit = (e) => {
    e.preventDefault();
    if (age === '' || gender === '') {
      alert("Please provide both age and gender.");
      return;
    }
    setStep(2);
  };
  
  // Handler for selecting an option for current question
  const handleOptionSelect = (value) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = value;
    setResponses(newResponses);
  };
  
  // Navigate to next question or submit if it's the last one
  const handleNextQuestion = () => {
    if (responses[currentQuestion] === null) {
      alert("Please select an option before proceeding.");
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitTest();
    }
  };
  
  // Navigate to previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Submit test responses to the backend pre-assessment endpoint
  const submitTest = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const payload = {
      ghq12_responses: responses,  // raw responses; your backend handles reverse scoring for positive questions
      age: parseInt(age),
      gender: gender
    };
    
    try {
      const response = await fetch("http://localhost:6543/api/pre-assessment/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
        if (response.ok) {
        // data = { recommendedProfessional: "..." }
        const recommended = data.recommendedProfessional;
        
        // Store in localStorage
        localStorage.setItem("recommendedProfessional", recommended);

        // Show the user a result
        setResult(`Recommended Professional: ${recommended}`);
        setStep(3);
        } else {
        alert("Error: " + data.error);
        }
    } catch (error) {
      console.error("Error submitting test:", error);
      alert("An error occurred while submitting the test.");
    } finally {
      setLoading(false);
    }
  };
  
  // Render based on current step
  if (step === 1) {
    return (
      <div style={{alignItems:"center"}}>
      <center className="homeBackground">
      <div className="container-md homeBackground" style={{alignContent:"center", display:"grid", textAlign:"center", fontFamily:"font1", userSelect:"none", justifyContent:"center", position:"relative", marginTop:"30vh"}} fluid>
        <div style={{alignItems:"center", justifyContent:"center"}}>
        <h1 style={{fontFamily:"font2"}}>Pre-Assessment Form</h1>
        <Form onSubmit={handleDemographicsSubmit}>
          <Form.Group>
            <Form.Label>Age: </Form.Label>
            <Form.Control
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Gender: </Form.Label>
            <Form.Select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>
          <button className="registerButton" type="submit" style={{minWidth:"30%", width:"30%"}}>Start Test</button>
        </Form>
        </div>
      </div>
      </center>
      </div>
    );
  } else if (step === 2) {
    return (
      <center className="homeBackground">
      <div className="container-md homeBackground" style={{fontFamily:"font1", alignItems:"center", justifyContent:"center", position:"relative", marginTop:"30vh"}}>
        <h1 style={{fontFamily:"font2"}}>Pre-Assessment Form</h1>
        <div>
          <h3 style={{color:"#1f2949"}}>Question: {currentQuestion + 1} / {questions.length}</h3>
        </div>
        <div>
          <h2 style={{color:"#3674B5"}}>{questions[currentQuestion]}</h2>
        </div>
        <div className="assessmentContainer">
          {options.map((option) => (
            <div key={option.value} className="assessmentButtonContainer">
              <input 
                className="hidden"
                type="radio" 
                id={`option-${option.value}`} 
                name="option" 
                value={option.value} 
                checked={responses[currentQuestion] === option.value}
                onChange={() => handleOptionSelect(option.value)}
              />
              <label className="assessmentButtonLabel" htmlFor={`option-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
        <div style={{display:"flex", justifyContent:"center"}}>
          {currentQuestion > 0 && (
            <button onClick={handlePrevQuestion} className="registerButton" style={{width:"40%", margin:"20px"}}>⇦ Previous</button>
          )}
          <button onClick={handleNextQuestion} disabled={loading} className="registerButton" style={currentQuestion > 0 ? { width: "40%", margin:"20px" } : { width : "40%", margin:"20px"}}>
            {currentQuestion === questions.length - 1 ? "Submit Test ✔" : "Next Question ⇨"}
          </button>
        </div>
      </div>
      </center>
    );
  } else if (step === 3) {
    return (
      <center className="homeBackground">
      <div className="container-md homeBackground" style={{fontFamily:"font1", alignItems:"center", justifyContent:"center", position:"relative", marginTop:"30vh"}}>
        <h1 style={{fontFamily:"font2"}}>Test Completed</h1>
        {loading ? (
          <p>Processing...</p>
        ) : (
          <div>
            <h2>{result}</h2>
            <div style={{display:"flex", justifyContent:"center"}}>
            <button onClick={() => window.location.reload()} className="registerButton" style={{width:"30%", margin:"20px"}}>↻ Retake Test</button>
            <button onClick={() => navigate("/home")} className="registerButton" style={{width:"30%", margin:"20px"}}>Done ✔</button>
            </div>
          </div>
        )}
      </div>
      </center>
    );
  }
  
  return null;
}

export default Test;