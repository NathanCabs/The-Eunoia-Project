import React, { useState } from 'react';
import api from './Axios';

const AddComment = ({ postId, comment = null, onCommentAdded, onCancel }) => {
    const [content, setContent] = useState(comment ? comment.content : "");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const userId = localStorage.getItem('userId');

        try {
            if (comment) {
                // Update existing comment
                await api.put(`http://localhost:6543/api/comments/update/${comment.id}`, 
                    { userId, content });
            } else {
                // Create new comment
                await api.post(`http://localhost:6543/api/comments/add`, 
                    { postId, userId, content });
            }

            setContent("");
            onCommentAdded(); // Refresh comment list
        } catch (err) {
            console.error("Failed to submit comment:", err);
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
                required
                style={{ width: "30%", minHeight: "50px", resize: "none", overflowY: "hidden" }}
                rows={1}
                onInput={(e) => {
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
                }}
            />
            <br></br>
            <button type="submit">{comment ? "Update" : "Comment"}</button>
            {comment && (
                    <button type="button" onClick={onCancel} style={{ marginLeft: "10px" }}>
                        Cancel
                    </button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default AddComment;
