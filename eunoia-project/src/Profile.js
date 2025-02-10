import './Login.css';
import NavigationBar from './NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Profile() {
    return(
        <div fluid>
            <NavigationBar />
            <Container style={{width:"100%", paddingTop:"1.5rem"}}>
                <Row>
                    <Col style={{paddingBottom:"1.5rem"}}>
                        <h1>Profile</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    
                    </Col>
                </Row>
            </Container>
        </div>
        /* Edit and view user profile information*/
    )
}

export default Profile;