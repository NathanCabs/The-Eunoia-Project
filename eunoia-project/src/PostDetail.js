import React from 'react';
import DeletePost from './DeletePost'; // import DeletePost component

const PostDetail = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      {/* Include the DeletePost component, passing the postId as a prop */}
      <DeletePost postId={post.id} />
    </div>
  );
};

export default PostDetail;
