//package com.thesis2.EunoiaProject.Controllers;
//
//import com.thesis2.EunoiaProject.Model.Post;
//import com.thesis2.EunoiaProject.Services.PostService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Optional;
//
//@RestController
//@RequestMapping("/api/posts")
//public class PostController {
//
//    private final PostService postService;
//
//    public PostController(PostService postService) {
//        this.postService = postService;
//    }
//
//    @PostMapping("/create")
//    public ResponseEntity<Post> createPost(@RequestBody Post postRequest) {
//        if (postRequest.getUser() == null || postRequest.getUser().getId() == 0) {
//            return ResponseEntity.badRequest().build();
//        }
//
//        Post post = postService.createPost(postRequest.getUser().getId(), postRequest.getContent());
//        return post != null ? ResponseEntity.ok(post) : ResponseEntity.badRequest().build();
//    }
//
//    @GetMapping
//    public ResponseEntity<List<Post>> getAllPosts() {
//        return ResponseEntity.ok(postService.getAllPosts());
//    }
//
//    @GetMapping("/{postId}")
//    public ResponseEntity<Post> getPostById(@PathVariable int postId) {
//        Optional<Post> post = postService.getPostById(postId);
//        return post.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @PutMapping("/{postId}/update")
//    public ResponseEntity<Post> updatePost(@PathVariable int postId, @RequestBody Post postRequest) {
//        Post updatedPost = postService.updatePost(postId, postRequest.getContent());
//        return updatedPost != null ? ResponseEntity.ok(updatedPost) : ResponseEntity.notFound().build();
//    }
//
//    @DeleteMapping("/{postId}/delete")
//    public ResponseEntity<Void> deletePost(@PathVariable int postId) {
//        postService.deletePost(postId);
//        return ResponseEntity.noContent().build();
//    }
//
//    @PostMapping("/{postId}/like")
//    public ResponseEntity<Void> likePost(@PathVariable int postId) {
//        postService.likePost(postId);
//        return ResponseEntity.ok().build();
//    }
//
//    @PostMapping("/{postId}/unlike")
//    public ResponseEntity<Void> unlikePost(@PathVariable int postId) {
//        postService.unlikePost(postId);
//        return ResponseEntity.ok().build();
//    }
//}
package com.thesis2.EunoiaProject.Controllers;

import com.thesis2.EunoiaProject.Model.Post;
import com.thesis2.EunoiaProject.Services.PostService;

import org.springframework.http.HttpStatus;
import com.thesis2.EunoiaProject.DTO.PostRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "https://eunoia.social")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    // ✅ Create a new post (Authenticated user)
    @PostMapping("/create")
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest, Authentication auth) {
        String email = auth.getName();

        if (postRequest.getContent() == null || postRequest.getContent().isEmpty()) {
            return ResponseEntity.badRequest().body(null);
        }

        Post post = postService.createPost(email, postRequest.getContent());
        return ResponseEntity.ok(post);
    }

    // ✅ Get all posts (Users and Admins)
    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    // ✅ Get specific post by ID
    @GetMapping("/{postId}")
    public ResponseEntity<Post> getPostById(@PathVariable int postId) {
        return postService.getPostById(postId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Update post (User can update their own; Admin can update any post)
    @PutMapping("/{postId}/update")
    public ResponseEntity<Post> updatePost(
            @PathVariable int postId,
            @RequestBody PostRequest postRequest,
            Authentication auth) {

        if (postRequest.getContent() == null || postRequest.getContent().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String email = auth.getName();
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN"));

        try {
            Post updatedPost = postService.updatePost(postId, postRequest.getContent(), email, isAdmin);
            return ResponseEntity.ok(updatedPost);
        } catch (SecurityException e) {
            return ResponseEntity.status(403).build(); // Forbidden
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build(); // Post not found
        }
    }

    // ✅ Delete post (User can delete their own; Admin can delete any post)
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
    public ResponseEntity<Void> deletePost(@PathVariable int postId, Authentication auth) {
        String email = auth.getName();
        boolean isAdmin = auth.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN"));

        try {
            postService.deletePost(postId, email, isAdmin);
            return ResponseEntity.noContent().build();
        } catch (SecurityException e) {
            return ResponseEntity.status(403).build(); // Forbidden
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build(); // Post not found
        }
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

    // ✅ Like post endpoint now uses Authentication
    @PostMapping("/{postId}/like")
    public ResponseEntity<Void> likePost(@PathVariable int postId, Authentication auth) {
        String email = auth.getName();
        postService.likePost(postId, email);
        return ResponseEntity.ok().build();
    }

    // ✅ Unlike post endpoint now uses Authentication
    @PostMapping("/{postId}/unlike")
    public ResponseEntity<Void> unlikePost(@PathVariable int postId, Authentication auth) {
        String email = auth.getName();
        postService.unlikePost(postId, email);
        return ResponseEntity.ok().build();
    }
}
