package com.thesis2.EunoiaProject.Controllers;

import com.thesis2.EunoiaProject.Model.Post;
import com.thesis2.EunoiaProject.Services.PostService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody Post postRequest) {
        if (postRequest.getUser() == null || postRequest.getUser().getId() == 0) {
            return ResponseEntity.badRequest().build();
        }

        Post post = postService.createPost(postRequest.getUser().getId(), postRequest.getContent());
        return post != null ? ResponseEntity.ok(post) : ResponseEntity.badRequest().build();
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable int postId) {
        Optional<Post> post = postService.getPostById(postId);
        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{postId}/update")
    public ResponseEntity<Post> updatePost(@PathVariable int postId, @RequestBody Post postRequest) {
        Post updatedPost = postService.updatePost(postId, postRequest.getContent());
        return updatedPost != null ? ResponseEntity.ok(updatedPost) : ResponseEntity.notFound().build();
    }

    // @PutMapping("/{postId}/update")
    // public ResponseEntity<Post> updatePost(@PathVariable int postId, @RequestParam int userId, @RequestBody Post postRequest) {
    //     Optional<Post> existingPost = postService.getPostById(postId);

    //     if (existingPost.isPresent() && existingPost.get().getUser().getId() == userId) {
    //         Post updatedPost = postService.updatePost(postId, postRequest.getContent());
    //         return ResponseEntity.ok(updatedPost);
    //     } else {
    //         return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null); // Prevent unauthorized updates
    //     }
    // }

    @DeleteMapping("/{postId}/delete")
    public ResponseEntity<Void> deletePost(@PathVariable int postId) {
        postService.deletePost(postId);
        return ResponseEntity.noContent().build();
    }

    // @DeleteMapping("/{postId}/delete")
    // public ResponseEntity<Void> deletePost(@PathVariable int postId, @RequestParam int userId) {
    //     Optional<Post> existingPost = postService.getPostById(postId);

    //     if (existingPost.isPresent() && existingPost.get().getUser().getId() == userId) {
    //         postService.deletePost(postId);
    //         return ResponseEntity.noContent().build();
    //     } else {
    //         return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // Prevent unauthorized deletion
    //     }
    // }

    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> likePost(@PathVariable int postId) {
        postService.likePost(postId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{postId}/unlike")
    public ResponseEntity<Void> unlikePost(@PathVariable int postId) {
        postService.unlikePost(postId);
        return ResponseEntity.ok().build();
    }
}
