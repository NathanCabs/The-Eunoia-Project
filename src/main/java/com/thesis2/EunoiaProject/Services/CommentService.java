package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.Model.Comment;
import com.thesis2.EunoiaProject.Model.Post;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.CommentRepository;
import com.thesis2.EunoiaProject.Repository.PostRepository;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    public Comment addComment(int postId, int userId, String content) {
        Optional<Post> post = postRepository.findById(postId);
        Optional<User> user = userRepository.findById(userId);

        if (post.isEmpty() || user.isEmpty()) {
            throw new RuntimeException("Post or User not found");
        }

        Comment comment = new Comment(post.get(), user.get(), content);
        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByPost(int postId) {
        return commentRepository.findByPostId(postId);
    }

    public Optional<Comment> getCommentById(int id) {
        return commentRepository.findById(id);
    }

    public Comment updateComment(int id, String newContent) {
        Optional<Comment> comment = commentRepository.findById(id);
        if (comment.isEmpty()) {
            throw new RuntimeException("Comment not found");
        }

        Comment updatedComment = comment.get();
        updatedComment.setContent(newContent);
        return commentRepository.save(updatedComment);
    }

    public void deleteComment(int id) {
        if (!commentRepository.existsById(id)) {
            throw new RuntimeException("Comment not found");
        }
        commentRepository.deleteById(id);
    }
}
