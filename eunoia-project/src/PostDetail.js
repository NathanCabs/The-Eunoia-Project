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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

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
      const response = await api.get(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/posts/${postId}`);
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
      await api.delete(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/posts/${post.id}/delete`);
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

  if (loading) {
    return (
      <div>
      <NavigationBar />
            <center>
              <Container className="homeBackground" style={{fontFamily:"font1", marginTop:"10%"}}>
                <FontAwesomeIcon icon={faCircleNotch} spin style={{fontSize:"120px", marginBottom:"10px", color:"#8F87F1"}}/>
                <p>Loading post...</p>
              </Container>
            </center>
      </div>
    )
  }
  if (error) return <p>{error}</p>;

  return (
    <div>
      <NavigationBar />
      <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
        <Row>
          <Col style={{ paddingBottom: "1.5rem" }}>
            <Link to="/home" onClick={() => setEditing(false)} style={{fontFamily:"font1"}}>Back</Link>
            <h2 style={{fontFamily:"font2"}}>{post.user.username}'s Post</h2>
            {editing ? (
            <div style={{display:"block"}}>
              <CreatePost post={post} refreshPosts={refreshPost} cancelEdit={cancelEdit}/>
            </div>
            ) : (
              <p style={{fontFamily:"font1"}}>{post.content}</p>
            )}
            {/* Show edit and delete options if the logged-in user is the original author and not in edit mode */}
            {parseInt(userId) === post.user.id && !editing && (
              <span className="addComment">
              <div>
                <button className="button-19" onClick={() => setEditing(true)} style={{margin:"5px", width:"auto"}}>Edit</button>
                <button className="button-21" onClick={handleDelete} style={{margin:"5px", width:"auto"}}>Delete</button>
              </div>
              </span>
            )}
            <span style={{display:"flex", alignItems:"center"}}>
              <div style={{display:"inline-block"}}>
                <LikePost postId={post.id} likedBy={post.likedBy} refreshPost={fetchPost} />
              </div>
              <div style={{display:"inline-block"}}>
            <span style={{fontFamily:"font1", fontSize:"20px"}}>{post.likes} {post.likes == 1 ? "Like" : "Likes"}</span>
              </div>
            </span>
              <AddComment postId={post.id} onCommentAdded={handleCommentAdded} />
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
