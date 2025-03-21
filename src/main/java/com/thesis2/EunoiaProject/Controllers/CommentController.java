//package com.thesis2.EunoiaProject.Controllers;
//
//import com.thesis2.EunoiaProject.Model.Comment;
//import com.thesis2.EunoiaProject.Services.CommentService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/comments")
//public class CommentController {
//
//    @Autowired
//    private CommentService commentService;
//
//    @PostMapping("/add")
//    public Comment addComment(@RequestParam int postId, @RequestParam int userId, @RequestParam String content) {
//        return commentService.addComment(postId, userId, content);
//    }
//
//    @GetMapping("/post/{postId}")
//    public List<Comment> getCommentsByPost(@PathVariable int postId) {
//        return commentService.getCommentsByPost(postId);
//    }
//
//    @GetMapping("/{id}")
//    public Optional<Comment> getCommentById(@PathVariable int id) {
//        return commentService.getCommentById(id);
//    }
//
//    @PutMapping("/update/{id}")
//    public Comment updateComment(@PathVariable int id, @RequestParam String newContent) {
//        return commentService.updateComment(id, newContent);
//    }
//
//    @DeleteMapping("/delete/{id}")
//    public String deleteComment(@PathVariable int id) {
//        commentService.deleteComment(id);
//        return "Comment deleted successfully";
//    }
//}
package com.thesis2.EunoiaProject.Controllers;

import com.thesis2.EunoiaProject.DTO.CommentRequest;
import com.thesis2.EunoiaProject.Model.Comment;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import com.thesis2.EunoiaProject.Security.JwtUtil;
import com.thesis2.EunoiaProject.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://eunoia.social")
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // ✅ Add a comment using authenticated user info
    @PostMapping("/add")
    public ResponseEntity<Comment> addComment(@RequestBody CommentRequest commentRequest, Authentication auth) {
        String email = auth.getName();
        System.out.println(email);
        if (commentRequest.getContent() == null || commentRequest.getContent().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Comment comment = commentService.addComment(commentRequest.getPostId(), email, commentRequest.getContent());
        return ResponseEntity.ok(comment);
    }



    // ✅ Get all comments for a specific post
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPost(@PathVariable int postId) {
        return ResponseEntity.ok(commentService.getCommentsByPost(postId));
    }

    // ✅ Get specific comment by ID
    @GetMapping("/{commentId}")
    public ResponseEntity<Comment> getCommentById(@PathVariable int commentId) {
        Comment comment = commentService.getCommentById(commentId);
        return ResponseEntity.ok(comment);
    }

    // ✅ Update comment (User can update their own; Admin can update any)
    // @PutMapping("/update/{id}")
    // public Comment updateComment(@PathVariable int id, @RequestParam String newContent) {
    //     return commentService.updateComment(id, newContent);
    // }

    @PutMapping("/update/{id}")
    public ResponseEntity<Comment> updateComment(
            @PathVariable int id,
            @RequestBody CommentRequest commentRequest,
            Authentication auth) {

        String email = auth.getName();
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN"));

        if (commentRequest.getContent() == null || commentRequest.getContent().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Comment updatedComment = commentService.updateComment(id, commentRequest.getContent(), email, isAdmin);
        return ResponseEntity.ok(updatedComment);
    }

    // @DeleteMapping("/delete/{id}")
    // public String deleteComment(@PathVariable int id) {
    //     commentService.deleteComment(id);
    //     return "Comment deleted successfully";
    // }



    // ✅ Delete comment (User can delete their own; Admin can delete any)
    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable int commentId, Authentication auth) {
        String email = auth.getName();
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN"));

        try {
            commentService.deleteComment(commentId, email, isAdmin);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (SecurityException e) {
            return ResponseEntity.status(403).build(); // Forbidden
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build(); // Comment not found
        }
    }
}
