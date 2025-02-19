package com.thesis2.EunoiaProject.Controllers;

import com.thesis2.EunoiaProject.Model.Comment;
import com.thesis2.EunoiaProject.Services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @DeleteMapping("/delete/{id}")
    public String deleteComment(@PathVariable int id) {
        commentService.deleteComment(id);
        return "Comment deleted successfully";
    }
}
