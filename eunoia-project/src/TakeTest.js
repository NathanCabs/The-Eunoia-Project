import './Login.scss';
import { Link } from 'react-router-dom';

function TakeTest() {
  return (
    <center className="homeBackground">
    <div className="container-md homeBackground" style={{alignContent:"center", display:"grid", minHeight:"90vh", userSelect:"none"}}>
        <h1 style={{fontFamily:"font2"}}>
            We'll have to learn more from you
        </h1>
        <p style={{fontFamily:"font1", color:"#3056d5", marginTop:"10px", fontSize:"20px"}}>
            Take a short pre-assessment form in order to be recommended<br></br> a type of doctor suited to your symptoms.
        </p>
        <div>
            <Link className="registerButton" to="/test" style={{alignContent:"center"}}>Take Assessment<span aria-hidden="true">➔</span></Link>
        </div>
    </div>
    </center>
  )
}

export default TakeTest;