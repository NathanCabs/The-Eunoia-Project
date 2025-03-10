import React, { useEffect, useState } from "react";

const Comment = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    const response = await fetch(`http://localhost:6543/api/comments/post/${postId}`);
    const data = await response.json();
    setComments(data);
  };

  const addComment = async () => {
    if (!newComment) return;
    const response = await fetch(`http://localhost:6543/api/comments/add?postId=${postId}&userId=${user.id}&content=${newComment}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    const comment = await response.json();
    setComments([...comments, comment]);
    setNewComment("");
  };

  const updateComment = async (commentId, newContent) => {
    const response = await fetch(`http://localhost:6543/api/comments/update/${commentId}?userId=${user.id}&newContent=${newContent}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) fetchComments();
  };

  const deleteComment = async (commentId) => {
    await fetch(`http://localhost:6543/api/comments/delete/${commentId}?userId=${user.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  return (
    <div>
      <h4>Comments</h4>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p><strong>{comment.user.username}</strong>: {comment.content}</p>
          {comment.user.id === user.id && (
            <>
              <button onClick={() => updateComment(comment.id, prompt("Edit comment:", comment.content))}>Edit</button>
              <button onClick={() => deleteComment(comment.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
      <input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." />
      <button onClick={addComment}>Comment</button>
    </div>
  );
};

export default Comment;
