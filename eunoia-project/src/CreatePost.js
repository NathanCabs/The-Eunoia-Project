import './Login.css';
// import NavigationBar from './NavigationBar';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
 import axios from 'axios';

const CreatePost = ({ post, refreshPosts, cancelEdit }) => {
    const [content, setContent] = useState(post ? post.content : "");
    const [error, setError] = useState("");
    const userId = localStorage.getItem("userId");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const token = localStorage.getItem("authToken");
        if (!token) {
            setError("You must be logged in to create a post.");
            return;
        }

        try {
            if (post){
                await axios.put(`http://localhost:6543/api/posts/${post.id}/update`,{ 
                    content },
                    { headers: { 
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    } }
                  );
                alert("Post updated successfully!");
                cancelEdit();
                refreshPosts();
            } else {
                const response = await fetch("http://localhost:6543/api/posts/create", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        user: { id: userId },
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
            }
        } catch (err) {
            console.error("Error creating post:", err);
            setError(err.message || "An error occurred.");
        }
    };

    return(
        <div fluid>
            <form action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                    <div>
                        {/* <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder={post ? "Edit Post" : "What's on your mind?"} required/> */}
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={post ? "Edit Post" : "What's on your mind?"}
                            required
                            style={{ width: "100%", minHeight: "50px", resize: "none", overflowY: "hidden" }}
                            rows={1}
                            onInput={(e) => {
                                e.target.style.height = "auto"; // Reset height
                                e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
                            }}
                        ></textarea>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div>
                    {post && <button type="button" onClick={cancelEdit}>Cancel</button>}
                    <button type="submit">{post ? "Done" : "Post"}</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;