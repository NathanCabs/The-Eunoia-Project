import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import axios from "axios"; 
import Comment from "./Comment"; 
import NavigationBar from './NavigationBar';

const PostDetail = () => {
    const { postId } = useParams(); 
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
              //const token = localStorage.getItem("authToken");
                const response = await axios.get(`http://localhost:6543/api/posts/${postId}`);
                setPost(response.data);
            } catch (err) {
                setError("Post not found.");
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [postId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div fluid>
          <NavigationBar />
          <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
            <Row>
              <Col style={{ paddingBottom: "1.5rem" }}>
              <Link to="/home">Back</Link>
                <h2>{post.user.username}'s Post</h2>
                <p>{post.content}</p>
                <Comment postId={post.id} user={{ id: localStorage.getItem("userId") }} />
              </Col>
            </Row>
          </Container>
        </div>
    );
};

export default PostDetail;
