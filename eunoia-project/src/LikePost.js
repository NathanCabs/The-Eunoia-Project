import React from 'react';
import axios from 'axios';

const LikePost = ({ postId }) => {
  const handleLike = async () => {
    try {
      await axios.post(`/api/posts/${postId}/like`);
      console.log('Post liked');
    } catch (err) {
      console.error('Error liking post');
    }
  };

  const handleUnlike = async () => {
    try {
      await axios.post(`/api/posts/${postId}/unlike`);
      console.log('Post unliked');
    } catch (err) {
      console.error('Error unliking post');
    }
  };

  return (
    <div>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleUnlike}>Unlike</button>
    </div>
  );
};

export default LikePost;
