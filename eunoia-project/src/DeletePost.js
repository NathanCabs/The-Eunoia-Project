import React, { useState } from 'react';
import axios from 'axios';

const DeletePost = ({ postId }) => {
  const [error, setError] = useState('');
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/posts/${postId}/delete`);
      if (response.status === 204) {
        setIsDeleted(true);
        console.log('Post deleted successfully');
      }
    } catch (err) {
      setError('Error deleting post.');
      console.error('Error deleting post', err);
    }
  };

  return (
    <div>
      {isDeleted ? (
        <p>Post has been deleted.</p>
      ) : (
        <div>
          <button onClick={handleDelete}>Delete Post</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default DeletePost;
