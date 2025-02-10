import './Login.css';
import NavigationBar from './NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreatePost() {
    return(
        <div fluid>
            <NavigationBar />
            <Container style={{width:"100%", paddingTop:"1.5rem"}}>
                <Row>
                    <Col style={{paddingBottom:"1.5rem"}}>
                        <h1>Create</h1>
                    </Col>
                </Row>
                <Row style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px"}}>
                    <Col style={{backgroundColor:"#787878", padding:"15px 30px", borderRadius:"25px"}}>
                    <form action="#" method="POST">
                        <div>
                                <label for="title">Title</label>
                            <div>
                                <input type="text" name="title" id="title" placeholder="Title" required/>
                            </div>
                        </div>
                        <div>
                                <label for="description">Description</label>
                            <div>
                                <input type="text" name="description" id="description" placeholder="Description" required/>
                            </div>
                        </div>
                        <div>
                            <button type="submit">Post</button>
                        </div>
                    </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreatePost;