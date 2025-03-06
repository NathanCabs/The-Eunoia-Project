package com.thesis2.EunoiaProject.Controllers;

import com.thesis2.EunoiaProject.Model.Comment;
import com.thesis2.EunoiaProject.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/add")
    public Comment addComment(@RequestParam int postId, @RequestParam int userId, @RequestParam String content) {
        return commentService.addComment(postId, userId, content);
    }

    @GetMapping("/post/{postId}")
    public List<Comment> getCommentsByPost(@PathVariable int postId) {
        return commentService.getCommentsByPost(postId);
    }

    @GetMapping("/{id}")
    public Optional<Comment> getCommentById(@PathVariable int id) {
        return commentService.getCommentById(id);
    }

    @PutMapping("/update/{id}")
    public Comment updateComment(@PathVariable int id, @RequestParam String newContent) {
        return commentService.updateComment(id, newContent);
    }

    // @PutMapping("/update/{id}")
    // public ResponseEntity<Comment> updateComment(@PathVariable int id, @RequestParam int userId, @RequestParam String newContent) {
    //     Optional<Comment> existingComment = commentService.getCommentById(id);

    //     if (existingComment.isPresent() && existingComment.get().getUser().getId() == userId) {
    //         Comment updatedComment = commentService.updateComment(id, newContent);
    //         return ResponseEntity.ok(updatedComment);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Prevent unauthorized updates
    //     }
    // }

    @DeleteMapping("/delete/{id}")
    public String deleteComment(@PathVariable int id) {
        commentService.deleteComment(id);
        return "Comment deleted successfully";
    }

//     @DeleteMapping("/delete/{id}")
// public ResponseEntity<String> deleteComment(@PathVariable int id, @RequestParam int userId) {
//     Optional<Comment> existingComment = commentService.getCommentById(id);

//     if (existingComment.isPresent() && existingComment.get().getUser().getId() == userId) {
//         commentService.deleteComment(id);
//         return ResponseEntity.ok("Comment deleted successfully");
//     } else {
//         return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Unauthorized to delete this comment");
//     }
// }
}
