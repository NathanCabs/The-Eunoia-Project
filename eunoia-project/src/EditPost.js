import './Login.css';
import NavigationBar from './NavigationBar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPost = ({ postId }) => {
        const [post, setPost] = useState(null);
        const [newContent, setNewContent] = useState('');
        const [error, setError] = useState('');
      
        useEffect(() => {
          // Fetch post details
          const fetchPost = async () => {
            try {
              const response = await axios.get(`/api/posts/${postId}`);
              if (response.status === 200) {
                setPost(response.data);
                setNewContent(response.data.content);
              }
            } catch (err) {
              setError('Error fetching post details.');
            }
          };
      
          fetchPost();
        }, [postId]);
      
        const handleUpdatePost = async (e) => {
          e.preventDefault();
      
          try {
            const response = await axios.put(`/api/posts/${postId}/update`, { content: newContent });
            if (response.status === 200) {
              console.log('Post updated:', response.data);
            }
          } catch (err) {
            setError('Error updating post.');
          }
        };

    return(
        <div>
            <Container style={{width:"100%", paddingTop:"1.5rem"}}>
                <Row>
                    <Col style={{paddingBottom:"1.5rem"}}>
                        <h1>Edit Post</h1>
                    </Col>
                </Row>
                <Row style={{backgroundColor:"#282c34", padding:"10px", borderRadius:"30px"}}>
                    <Col style={{backgroundColor:"#787878", padding:"15px 30px", borderRadius:"25px"}}>
                    <form action="#" method="POST" onSubmit={handleCreatePost}>
                        <div>
                                <label>Title: {post.title}</label>
                        </div>
                        <div>
                                <label for="description">Content:</label>
                            <div>
                                <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} placeholder="Description" required/>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>
                        <div>
                            <button type="submit">Update</button>
                        </div>
                    </form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default EditPost;