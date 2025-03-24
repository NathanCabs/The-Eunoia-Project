import React, { useState, useEffect } from 'react';
import api from './Axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const LikePost = ({ postId, likedBy, refreshPost }) => {
  const userId = localStorage.getItem('userId');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (likedBy && Array.isArray(likedBy)) {
      // Assume likedBy is an array of user objects with an "id" property
      setLiked(likedBy.some(user => user.id === Number(userId)));
    }
  }, [likedBy, userId]);

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        await api.post(`http://localhost:6543/api/posts/${postId}/unlike`);
        setLiked(false);
      } else {
        await api.post(`http://localhost:6543/api/posts/${postId}/like`);
        setLiked(true);
      }
      if (refreshPost) {
        refreshPost(); // Optionally refresh the parent component data
      }
    } catch (err) {
      console.error('Error toggling like', err);
    }
  };

  return (
    <div>
      <button onClick={handleLikeToggle} style={{background:"transparent", border:"0px", fontSize:"35px", }}>
        {liked ? <FontAwesomeIcon icon={faThumbsUp} /> : <FontAwesomeIcon icon={faThumbsUp}/>}
      </button>
    </div>
  );
};

export default LikePost;
