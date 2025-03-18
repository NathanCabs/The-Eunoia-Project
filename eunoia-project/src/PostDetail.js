import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import api from "./Axios";
import Comment from "./Comment";
import AddComment from "./AddComment";
import NavigationBar from "./NavigationBar";
import CreatePost from "./CreatePost";
import LikePost from "./LikePost";

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [commentRefresh, setCommentRefresh] = useState(0);
  const userId = localStorage.getItem("userId");

  const fetchPost = async () => {
    try {
      const response = await api.get(`http://localhost:6543/api/posts/${postId}`);
      setPost(response.data);
    } catch (err) {
      setError("Post not found.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await api.delete(`http://localhost:6543/api/posts/${post.id}/delete`);
      alert("Post deleted successfully!");
      navigate("/home");
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post.");
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    fetchPost();
  };

  const refreshPost = () => {
    setEditing(false);
    fetchPost();
  };

  // This callback is passed to AddComment so that whenever a new comment is added,
  // we increment the commentRefresh counter, forcing the Comment component to remount.
  const handleCommentAdded = () => {
    setCommentRefresh((prev) => prev + 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <NavigationBar />
      <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
        <Row>
          <Col style={{ paddingBottom: "1.5rem" }}>
            <Link to="/home" onClick={() => setEditing(false)}>Back</Link>
            <h2>{post.user.username}'s Post</h2>
            {editing ? (
              <CreatePost post={post} refreshPosts={refreshPost} cancelEdit={cancelEdit} />
            ) : (
              <p>{post.content}</p>
            )}
            {/* Show edit and delete options if the logged-in user is the original author and not in edit mode */}
            {parseInt(userId) === post.user.id && !editing && (
              <div>
                <button onClick={() => setEditing(true)}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            )}
            <div>
              <p>{post.likes} Likes</p>
              <LikePost postId={post.id} likedBy={post.likedBy} refreshPost={fetchPost} />
            </div>
            {/* AddComment triggers a refresh of comments when a new comment is added */}
            <AddComment postId={post.id} onCommentAdded={handleCommentAdded} />
            {/* The key change forces Comment to remount and fetch new data */}
            <Comment key={commentRefresh} postId={post.id} showAll={true} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PostDetail;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Link } from 'react-router-dom';
// import api from "./Axios"; 
// import Comment from "./Comment"; 
// import AddComment from "./AddComment";
// import NavigationBar from './NavigationBar';

// const PostDetail = () => {
//     const { postId } = useParams(); 
//     const [post, setPost] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchPost = async () => {
//             try {
//                 const response = await api.get(`http://localhost:6543/api/posts/${postId}`,);
//                 setPost(response.data);
//             } catch (err) {
//                 setError("Post not found.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchPost();
//     }, [postId]);

//     const refreshComments = async () => {
//       // Optionally trigger a refresh in the CommentList component
//       console.log("Refreshing comments...");
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>{error}</p>;

//     return (
//         <div fluid>
//           <NavigationBar />
//           <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
//             <Row>
//               <Col style={{ paddingBottom: "1.5rem" }}>
//               <Link to="/home">Back</Link>
//                 <h2>{post.user.username}'s Post</h2>
//                 <p>{post.content}</p>
//                 {/* ✅ AddComment for adding new comments */}
//                 <AddComment postId={post.id} onCommentAdded={refreshComments} />

//                 {/* ✅ Display all comments */}
//                 <Comment postId={post.id} showAll={true} />
//               </Col>
//             </Row>
//           </Container>
//         </div>
//     );
// };

// export default PostDetail;
