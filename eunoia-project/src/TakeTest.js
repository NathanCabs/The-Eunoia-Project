import './Login.css';

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
            <a href="#" className="text-sm/6 font-semibold text-gray-900">
                Take Assessment <span aria-hidden="true">→</span>
            </a>
        </div>
    </div>
    </center>
  )
}

export default TakeTest;