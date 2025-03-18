import './Login.css';
import { Link } from 'react-router-dom';

function TakeTest() {
  return (
    <center>
    <div className="container-md" style={{alignContent:"center", display:"grid", minHeight:"90vh"}}>
        <h1>
            We'll have to learn more from you
        </h1>
        <p>
            Take a short test in order to be grouped with people with similar experiences/conditions.
        </p>
        <div>
            <Link to="/test">Take Assessment<span aria-hidden="true">→</span></Link>
        </div>
    </div>
    </center>
  )
}

export default TakeTest;