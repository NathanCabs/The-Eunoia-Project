import './Login.scss';
// import NavigationBar from './NavigationBar';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import React, { useState } from 'react';
import api from './Axios';

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
                await api.put(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/posts/${post.id}/update`,
                    { content });
                alert("Post updated successfully!");
                cancelEdit();
                if (refreshPosts) {
                    refreshPosts(); // ✅ Only call if it's defined
                }
            } else {
                const response = await api.post("https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/posts/create", {
                    content
                  });
    
                const newPost = await response.data;
                console.log("Post created:", newPost);
                setContent(""); // Clear input after successful post creation
                alert("Post created successfully!");
                if (refreshPosts) {
                    refreshPosts(); // ✅ Only call if it's defined
                }
            }
        } catch (err) {
            console.error("Error creating post:", err);
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return(
        <div fluid>
            <form action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                    <div>
                        <textarea
                            className="createPostInput"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder={post ? "Edit Post" : "What's on your mind?"}
                            required
                            style={{ minHeight: "60px", resize: "none", overflowY: "hidden", fontFamily:"font1"}}
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
                    {post && <button type="button" onClick={cancelEdit} className="registerButton">Cancel</button>}
                    <button type="submit" className="registerButton" style={{width:"20%"}}>{post ? "Done" : "Post"}</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;