import React, { useEffect, useState } from "react";

const Comment = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("authToken");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://localhost:6543/api/comments/post/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching comments: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addComment = async () => {
    if (!newComment) {
      console.error("Comment is empty.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:6543/api/comments/add?postId=${postId}&content=${newComment}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Ensure token is sent
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to add comment: ${response.status}`);
      }
  
      const comment = await response.json();
      setComments([...comments, comment]);
      setNewComment("");
    } catch (error) {
      console.error(error.message);
    }
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
      {comments.slice(0, showAll ? comments.length : 5).map((comment) => (
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
      {comments.length > 5 && !showAll && (
                <button onClick={() => setShowAll(true)}>Show More</button>
            )}
      <input value={newComment} onChange={(e) => setNewComment(e.target.value)} placeholder="Write a comment..." />
      <button onClick={addComment}>Comment</button>
    </div>
  );
};

export default Comment;
