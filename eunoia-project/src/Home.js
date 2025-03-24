import './Login.scss';
import NavigationBar from './NavigationBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './Axios';
import Comment from './Comment';
import AddComment from './AddComment';
import PostForm from './CreatePost';
import LikePost from './LikePost';

function Home() {

    const [posts, setPosts] = useState([]);
    const [editingPost, setEditingPost] = useState(null);
    const userId = localStorage.getItem('userId');
    const role = localStorage.getItem('role');
    const [commentRefreshTrigger, setCommentRefreshTrigger] = useState(0);

    const handleCommentAdded = () => {
        setCommentRefreshTrigger(prev => prev + 1); // Changing this will trigger a re-render
    };

      useEffect(() => {
          fetchPosts();
        }, []);
  
    const fetchPosts = async () => {
      try {
        const response = await api.get("https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/posts",);
        console.log("Post response data:", response.data);
        const sortedPosts = response.data.sort((a, b) => b.likes - a.likes);
        setPosts(sortedPosts);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };

    const handleDelete = async (postId) => {
        try {
          await api.delete(`https://cs-thesis-eunoia-77e25f4fd502.herokuapp.com/api/posts/${postId}/delete`,);
          alert("Post deleted successfully!");
          fetchPosts();
        } catch (error) {
          console.error("Error deleting post:", error);
          alert("Failed to delete post.");
        }
      };
    
      const handleEdit = (post) => {
        if (Number(userId) !== post.user.id) {
          alert("You are not authorized to edit this post.");
          return;
        }
        setEditingPost(post);
      };
    
      const handleUpdateComplete = () => {
        setEditingPost(null);
        fetchPosts();
      };
    
    return (
      <div className="homeBackground" fluid>
        <NavigationBar />
        <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
          <Row>
            <Col style={{ paddingBottom: "1.5rem" }}>
              <PostForm refreshPosts={fetchPosts}/>
            </Col>
          </Row>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Row key={post.id} className="cardShadow" style={{ backgroundColor: "#3674B5", padding: "10px", borderRadius: "30px", marginBottom: "1rem"}}>
                <Col style={{ backgroundColor: "white", padding: "15px 30px", borderRadius: "25px"}}>
                  <div>
                    <h4 style={{fontFamily:"font2", color:"black"}}>{post.user.username}</h4>
                  </div>
                  <hr></hr>
                  <div>
                    <p style={{fontFamily:"font1"}}>{post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content}</p>
                    {post.content.length > 100 && (<Link to={`/post/${post.id}`} style={{fontFamily:"font1", background: 'none', border: 'none', color: 'blue', cursor: 'pointer'}}>Read More</Link>)}
                    <span className="addComment">
                    {Number(userId) === post.user.id && (
                        <button className="button-19" onClick={() => handleEdit(post)} style={{margin:"5px", width:"auto"}}>Edit</button>
                    )}
                    {(Number(userId) === post.user.id || role === "ADMIN") && (
                        <button className="button-21" onClick={() => handleDelete(post.id, post.user.id)} style={{margin:"5px", width:"auto"}}>Delete</button>
                    )}
                    {editingPost && editingPost.id === post.id && (
                        <PostForm post={editingPost} refreshPosts={handleUpdateComplete} cancelEdit={() => setEditingPost(null)}/>
                    )}
                    </span>
                  </div>
                   {/* ✅ Add Like/Unlike Button */}
                    <hr></hr>
                    {/* ✅ AddComment Component */}
                    <span style={{display:"flex", alignItems:"center"}}>
                    <div style={{display:"inline-block"}}>
                      <LikePost postId={post.id} likedBy={post.likedBy} refreshPost={fetchPosts} />
                    </div>
                    <div style={{display:"inline-block"}}>
                      <span style={{fontFamily:"font1", fontSize:"20px"}}>{post.likes} {post.likes == 1 ? "Like" : "Likes"}</span>
                    </div>
                    </span>
                    <AddComment postId={post.id} onCommentAdded={handleCommentAdded} />
                    {/* ✅ Show limited comments */}
                    <Comment postId={post.id} showAll={false} commentRefreshTrigger={commentRefreshTrigger} />
                    
                </Col>
              </Row>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </Container>
      </div>
    );
  }
  
  export default Home;