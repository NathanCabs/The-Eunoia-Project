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
                    <Col style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px"}}>
                        <h1>Hi</h1>
                    </Col>
                    <Col style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px"}}>
                        <h1>Hello</h1>
                    </Col>
                    <Col style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px"}}>
                        <h1>Bruh</h1>
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