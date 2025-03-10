import './Login.css';
import NavigationBar from './NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ userId }) => {

    const [content, setContent] = useState("");
    const [error, setError] = useState("");

    const handleCreatePost = async (e) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("authToken");
        if (!token) {
            setError("You must be logged in to create a post.");
            return;
        }

        try {
            const response = await fetch("api/posts/create", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Accept": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    user: { id: userId }, // Ensure user ID is sent
                    content,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create post");
            }

            const newPost = await response.json();
            console.log("Post created:", newPost);

            setContent(""); // Clear input after successful post creation
            alert("Post created successfully!");
        } catch (err) {
            console.error("Error creating post:", err);
            setError(err.message || "An error occurred.");
        }
    };

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
                    <form action="#" method="POST" onSubmit={handleCreatePost}>
                        {/* <div>
                                <label for="title">Title</label>
                            <div>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required/>
                            </div>
                        </div> */}
                        <div>
                                <label>Content</label>
                            <div>
                                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" required/>
                            </div>
                            {error && <p style={{ color: 'red' }}>{error}</p>}
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