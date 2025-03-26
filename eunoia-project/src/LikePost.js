import React, { useState, useEffect } from 'react';
import api from './Axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';

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
        await api.post(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/posts/${postId}/unlike`);
        setLiked(false);
      } else {
        await api.post(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/posts/${postId}/like`);
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
      <button onClick={handleLikeToggle} style={{background:"transparent", border:"0px", fontSize:"35px", margin:"5px"}} >
        {liked ? <FontAwesomeIcon icon={fasHeart} style={{color:"#ee4545"}}/> : <FontAwesomeIcon icon={farHeart} style={{color:"#ee4545"}}/>}
      </button>
    </div>
  );
};

export default LikePost;
