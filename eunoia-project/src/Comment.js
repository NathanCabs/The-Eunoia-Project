import React, { useState, useEffect } from 'react';
import api from './Axios';
import AddComment from './AddComment';

const Comment = ({ postId, showAll = false, commentRefreshTrigger }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingComment, setEditingComment] = useState(null);
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');

    useEffect(() => {
        fetchComments();
    }, [commentRefreshTrigger]);

    const fetchComments = async () => {
        try {
            const response = await api.get(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/comments/post/${postId}`);
            console.log("Comment response data:", response.data);
            setComments(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching comments:", err);
            setLoading(false);
        }
    };

    const deleteComment = async (commentId) => {
        try {
            await api.delete(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/comments/delete/${commentId}`);
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
        <div style={{display:"inline-block", fontFamily:"font1"}}>
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
                                <p style={{fontFamily:"font1"}}>{comment.content}</p>
                                <span className="addComment">
                                <small style={{fontFamily:"font2"}}>{comment.user.username}</small>
                                    <div style={{display:"flex"}}>
                                    {comment.user.id === parseInt(localStorage.getItem('userId')) && (
                                        <button id="special" className="button-19" style={{marginLeft:"20px", width:"auto"}} onClick={() => setEditingComment(comment)}>Edit</button>
                                    )}
                                    {(Number(userId) === comment.user.id || role === "ADMIN") && (
                                        <button className="button-20" style={{marginLeft:"20px", width:"auto"}} onClick={() => deleteComment(comment.id)}>Delete</button>
                                    )}
                                    </div>
                                </span>
                            </>
                        )}
                    </div>
                ))
            )}
            {!showAll && comments.length > 3 && (
                <button className="button-19" style={{margin:"15px", width:"100%"}} onClick={() => window.location.href = `/post/${postId}`}>View All Comments</button>
            )}
        </div>
    );
};

export default Comment;