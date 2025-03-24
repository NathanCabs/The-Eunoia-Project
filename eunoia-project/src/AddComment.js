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
                const response = await api.put(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/comments/update/${comment.id}`, 
                    { userId, content });
                    if (response.status === 200) {
                        setContent(""); // Clear input
                        onCommentAdded();
                    }
            } else {
                // Create new comment
                const response = await api.post(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/comments/add`, 
                    { postId, userId, content });
                    if (response.status === 200) {
                        setContent(""); // Clear input
                        onCommentAdded();
                    }
            }
            setContent("");// Refresh comments only for the affected post
        } catch (err) {
            console.error("Failed to submit comment:", err);
            setError(err.response?.data?.message || "An error occurred.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <span className="addComment">
            <textarea 
                className="createCommentInput"
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write a comment..."
                required
                style={{resize: "none", overflowY: "hidden", fontFamily:"font1"}}
                rows={1}
                onInput={(e) => {
                    e.target.style.height = "auto"; // Reset height
                    e.target.style.height = `${e.target.scrollHeight}px`; // Adjust height dynamically
                }}
            />
            <button className="button-19" type="submit">{comment ? "Update" : "Comment"}</button>
            {comment && (
                    <button className="button-20" type="button" onClick={onCancel}>
                        Cancel
                    </button>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            </span>
        </form>
    );
};

export default AddComment;
