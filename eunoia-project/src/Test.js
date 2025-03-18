import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

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
      <div className="test-container">
        <h1>Assessment Test</h1>
        <form onSubmit={handleDemographicsSubmit}>
          <div>
            <label>Age: </label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Gender: </label>
            <select value={gender} onChange={(e) => setGender(e.target.value)} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit">Start Test</button>
        </form>
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="test-container">
        <h1>Assessment Test</h1>
        <div className="game-details-container">
          <h2>Question: {currentQuestion + 1} / {questions.length}</h2>
        </div>
        <div className="game-question-container">
          <h3>{questions[currentQuestion]}</h3>
        </div>
        <div className="game-options-container">
          {options.map((option) => (
            <div key={option.value}>
              <input 
                type="radio" 
                id={`option-${option.value}`} 
                name="option" 
                value={option.value} 
                checked={responses[currentQuestion] === option.value}
                onChange={() => handleOptionSelect(option.value)}
              />
              <label htmlFor={`option-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
        <div className="next-button-container">
          {currentQuestion > 0 && (
            <button onClick={handlePrevQuestion}>Previous</button>
          )}
          <button onClick={handleNextQuestion} disabled={loading}>
            {currentQuestion === questions.length - 1 ? "Submit Test" : "Next Question"}
          </button>
        </div>
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="test-container">
        <h1>Test Completed</h1>
        {loading ? (
          <p>Processing...</p>
        ) : (
          <div>
            <h2>{result}</h2>
            <button onClick={() => window.location.reload()}>Retake Test</button>
            <button onClick={() => navigate("/home")}>Done</button>
          </div>
        )}
      </div>
    );
  }
  
  return null;
}

export default Test;