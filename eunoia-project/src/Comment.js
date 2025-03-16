import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddComment from './AddComment';

const CommentList = ({ postId, showAll = false }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingComment, setEditingComment] = useState(null);
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`http://localhost:6543/api/comments/post/${postId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", },
              withCredentials: true,
          });
            setComments(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching comments:", err);
            setLoading(false);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:6543/api/comments/delete/${commentId}`, {
                headers: { Authorization: `Bearer ${token}')}`,
                "Content-Type": "application/json", },
                withCredentials: true,
                });
            setComments(comments.filter(comment => comment.id !== commentId));
        } catch (err) {
            console.error("Failed to delete comment:", err);
        }
    };

    const handleCommentUpdated = () => {
        setEditingComment(null);
        fetchComments(); // Refresh comments after update
    };

    const handleCancelEdit = () => {
        setEditingComment(null); // Exit editing mode
    };

    return (
        <div>
            {loading ? (
                <p>Loading comments...</p>
            ) : (
                comments.slice(0, showAll ? comments.length : 3).map(comment => (
                    <div key={comment.id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
                        {editingComment && editingComment.id === comment.id ? (
                            <AddComment
                                postId={postId}
                                comment={editingComment}
                                onCommentAdded={handleCommentUpdated}
                                onCancel={handleCancelEdit}
                            />
                        ) : (
                            <>
                                <p>{comment.content}</p>
                                <small>By: {comment.user.username}</small>
                                {comment.user.id === parseInt(localStorage.getItem('userId')) && (
                                    <div>
                                        <button onClick={() => setEditingComment(comment)}>Edit</button>
                                        <button onClick={() => deleteComment(comment.id)}>Delete</button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))
            )}
            {!showAll && comments.length > 3 && (
                <button onClick={() => window.location.href = `/post/${postId}`}>View All Comments</button>
            )}
        </div>
    );
};

export default CommentList;