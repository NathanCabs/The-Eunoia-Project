import './Login.css';
import NavigationBar from './NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {

        const [posts, setPosts] = useState([]);
      
        useEffect(() => {
          const fetchPosts = async () => {
            try {
              const response = await axios.get('/api/posts');
              setPosts(response.data);
            } catch (err) {
              console.error('Error fetching posts', err);
            }
          };
      
          fetchPosts();
        }, []);

    return(
        <div fluid>
            <NavigationBar />
            <Container style={{width:"100%", paddingTop:"1.5rem"}}>
                <Row>
                    <Col style={{paddingBottom:"1.5rem"}}>
                        <h1>Home</h1>
                    </Col>
                </Row>
                {posts.length > 0 ? (
                    posts.map((post) => (
                <Row style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px"}}>
                    <Col style={{backgroundColor:"#787878", padding:"15px 30px", borderRadius:"25px"}}>
                        <div><h1>{post.title}</h1></div>
                        <div>
                            <p>{post.content}</p>
                        </div>
                        <div>
                            <p>Up vote -- Down vote -- Comment -- Save</p>
                        </div>
                    </Col>
                </Row>
                    ))) : (
                        <p>No posts available.</p>
                      )}
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