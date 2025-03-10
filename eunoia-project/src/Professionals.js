import './Login.css';
import NavigationBar from './NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Professionals() {
    return(
        <div fluid>
            <NavigationBar />
            <Container style={{width:"100%", paddingTop:"1.5rem"}}>
                <Row>
                    <Col style={{paddingBottom:"1.5rem"}}>
                        <h1>Professionals</h1>
                    </Col>
                </Row>
                <Row>
                    <Col style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px", margin:"20px"}}>
                    <center>
                        <img src='../pro1.jpg' width={270} height={369} alt="" style={{borderRadius:"30px"}}/>
                    </center>
                    </Col>
                    <Col style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px", margin:"20px"}}>
                    <center>
                        <img src='../pro2.jpg' width={270} height={369} alt="" style={{borderRadius:"30px"}}/>
                    </center>
                    </Col>
                    <Col style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px", margin:"20px"}}>
                    <center>
                        <img src='../pro3.jpeg' width={270} height={369} alt="" style={{borderRadius:"30px"}}/>
                    </center>
                    </Col>
                </Row>
            </Container>
        </div>
        /*  Browse professionals
            Be able to schedule for appointments
            Check for their info
        */
    )
}

export default Professionals;