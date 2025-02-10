import './Login.css';
import NavigationBar from './NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
    return(
        <div fluid>
            <NavigationBar />
            <Container style={{width:"100%", paddingTop:"1.5rem"}}>
                <Row>
                    <Col style={{paddingBottom:"1.5rem"}}>
                        <h1>Home</h1>
                    </Col>
                </Row>
                <Row style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px"}}>
                    <Col style={{backgroundColor:"#787878", padding:"15px 30px", borderRadius:"25px"}}>
                        <div><h1>Title</h1></div>
                        <div>
                            <p>sample sample sample bruh moment bruh moment bruh moment</p>
                        </div>
                        <div>
                            <p>Up vote -- Down vote -- Comment -- Save</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        /* Create new post 
           Scrollable social media posts
           Interactable sidebar
           Viewable posts
           Modal post viewing/interacting??
        */
    )
}

export default Home;