//package com.thesis2.EunoiaProject.Services;
//
//import com.thesis2.EunoiaProject.Model.Comment;
//import com.thesis2.EunoiaProject.Model.Post;
//import com.thesis2.EunoiaProject.Model.User;
//import com.thesis2.EunoiaProject.Repository.CommentRepository;
//import com.thesis2.EunoiaProject.Repository.PostRepository;
//import com.thesis2.EunoiaProject.Repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class CommentService {
//
//    @Autowired
//    private CommentRepository commentRepository;
//
//    @Autowired
//    private PostRepository postRepository;
//
//    @Autowired
//    private UserRepository userRepository;
//
//    public Comment addComment(int postId, int userId, String content) {
//        Optional<Post> post = postRepository.findById(postId);
//        Optional<User> user = userRepository.findById(userId);
//
//        if (post.isEmpty() || user.isEmpty()) {
//            throw new RuntimeException("Post or User not found");
//        }
//
//        Comment comment = new Comment(post.get(), user.get(), content);
//        return commentRepository.save(comment);
//    }
//
//    public List<Comment> getCommentsByPost(int postId) {
//        return commentRepository.findByPostId(postId);
//    }
//
//    public Optional<Comment> getCommentById(int id) {
//        return commentRepository.findById(id);
//    }
//
//    public Comment updateComment(int id, String newContent) {
//        Optional<Comment> comment = commentRepository.findById(id);
//        if (comment.isEmpty()) {
//            throw new RuntimeException("Comment not found");
//        }
//
//        Comment updatedComment = comment.get();
//        updatedComment.setContent(newContent);
//        return commentRepository.save(updatedComment);
//    }
//
//    public void deleteComment(int id) {
//        if (!commentRepository.existsById(id)) {
//            throw new RuntimeException("Comment not found");
//        }
//        commentRepository.deleteById(id);
//    }
//}
package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.Model.Comment;
import com.thesis2.EunoiaProject.Model.Post;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.CommentRepository;
import com.thesis2.EunoiaProject.Repository.PostRepository;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public CommentService(CommentRepository commentRepository, PostRepository postRepository, UserRepository userRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // ✅ Add a comment using authenticated user info
    public Comment addComment(int postId, String email, String content) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Comment comment = new Comment(post, user, content);
        return commentRepository.save(comment);
    }

    // ✅ Get all comments for a specific post
    public List<Comment> getCommentsByPost(int postId) {
        return commentRepository.findByPostId(postId);
    }

    // ✅ Get comment by ID
    public Comment getCommentById(int commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
    }

    // ✅ Update comment (User can update their own; Admin can update any)
    public Comment updateComment(int commentId, String content, String email, boolean isAdmin) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        // ✅ Allow admin to edit any comment or owner to edit their own comment
        if (!comment.getUser().getEmail().equals(email) && !isAdmin) {
            throw new SecurityException("You can only update your own comments");
        }

        comment.setContent(content);
        return commentRepository.save(comment);
    }


    // ✅ Delete comment (User can delete their own; Admin can delete any)
    public void deleteComment(int commentId, String email, boolean isAdmin) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        // ✅ Allow admin to delete any comment or owner to delete their own comment
        if (!comment.getUser().getEmail().equals(email) && !isAdmin) {
            throw new SecurityException("You can only delete your own comments");
        }

        commentRepository.delete(comment);
    }
}
