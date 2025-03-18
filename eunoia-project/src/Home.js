import './Login.css';
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

      useEffect(() => {
          fetchPosts();
        }, []);
  
    const fetchPosts = async () => {
      try {
        const response = await api.get("http://localhost:6543/api/posts",);
        console.log("Post response data:", response.data);
        const sortedPosts = response.data.sort((a, b) => b.likes - a.likes);
        setPosts(sortedPosts);
      } catch (err) {
        console.error("Error fetching posts", err);
      }
    };

    const handleDelete = async (postId) => {
        try {
          await api.delete(`http://localhost:6543/api/posts/${postId}/delete`,);
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
      <div fluid>
        <NavigationBar />
        <Container style={{ width: "100%", paddingTop: "1.5rem" }}>
          <Row>
            <Col style={{ paddingBottom: "1.5rem" }}>
              <h1>Home</h1>
              <PostForm refreshPosts={fetchPosts}/>
            </Col>
          </Row>
          {posts.length > 0 ? (
            posts.map((post) => (
              <Row key={post.id} style={{ backgroundColor: "#282c34", padding: "10px", borderRadius: "30px", marginBottom: "1rem" }}>
                <Col style={{ backgroundColor: "#787878", padding: "15px 30px", borderRadius: "25px" }}>
                  <div>
                    <h4>Posted by: {post.user.username}</h4>
                  </div>
                  <div>
                    <p>{post.content.length > 100 ? post.content.substring(0, 100) + "..." : post.content}</p>
                    {post.content.length > 100 && (<Link to={`/post/${post.id}`}>Read More</Link>)}
                    {Number(userId) === post.user.id && (
                        <div>
                        <button onClick={() => handleEdit(post)}>Edit</button>
                        <button onClick={() => handleDelete(post.id, post.user.id)}>Delete</button>
                        </div>
                    )}
                    {editingPost && editingPost.id === post.id && (
                        <PostForm post={editingPost} refreshPosts={handleUpdateComplete} cancelEdit={() => setEditingPost(null)}/>
                    )}
                  </div>
                   {/* ✅ Add Like/Unlike Button */}
                   <div>
                      <p>{post.likes} Likes</p>
                      <LikePost postId={post.id} likedBy={post.likedBy} refreshPost={fetchPosts} />
                    </div>
                    <br></br>
                    {/* ✅ AddComment Component */}
                    <AddComment postId={post.id} onCommentAdded={fetchPosts} />
                    {/* ✅ Show limited comments */}
                    <Comment postId={post.id} showAll={false} />
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