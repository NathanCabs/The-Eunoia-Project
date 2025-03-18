//package com.thesis2.EunoiaProject.Services;
//
//import com.thesis2.EunoiaProject.Model.Post;
//import com.thesis2.EunoiaProject.Model.User;
//import com.thesis2.EunoiaProject.Repository.PostRepository;
//import com.thesis2.EunoiaProject.Repository.UserRepository;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class PostService {
//
//    private final PostRepository postRepository;
//    private final UserRepository userRepository; // Added UserRepository to fetch users
//
//    public PostService(PostRepository postRepository, UserRepository userRepository) {
//        this.postRepository = postRepository;
//        this.userRepository = userRepository;
//    }
//
//    public Post createPost(int userId, String content) {
//        Optional<User> user = userRepository.findById(userId);
//        if (user.isPresent()) {
//            Post post = new Post(user.get(), content);
//            return postRepository.save(post);
//        }
//        return null;
//    }
//
//    public List<Post> getAllPosts() {
//        return postRepository.findAll();
//    }
//
//    public Optional<Post> getPostById(int postId) {
//        return postRepository.findById(postId);
//    }
//
//    public Post updatePost(int postId, String newContent) {
//        Optional<Post> post = postRepository.findById(postId);
//        if (post.isPresent()) {
//            Post updatedPost = post.get();
//            updatedPost.setContent(newContent);
//            return postRepository.save(updatedPost);
//        }
//        return null;
//    }
//
//    public void deletePost(int postId) {
//        postRepository.deleteById(postId);
//    }
//
//    public void likePost(int postId) {
//        Optional<Post> post = postRepository.findById(postId);
//        post.ifPresent(p -> {
//            p.likePost();
//            postRepository.save(p);
//        });
//    }
//
//    public void unlikePost(int postId) {
//        Optional<Post> post = postRepository.findById(postId);
//        post.ifPresent(p -> {
//            p.unlikePost();
//            postRepository.save(p);
//        });
//    }
//}

package com.thesis2.EunoiaProject.Services;

import com.thesis2.EunoiaProject.Model.Post;
import com.thesis2.EunoiaProject.Model.User;
import com.thesis2.EunoiaProject.Repository.PostRepository;
import com.thesis2.EunoiaProject.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    // ✅ Create Post
    public Post createPost(String email, String content) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Post post = new Post(user, content);
        return postRepository.save(post);
    }

    // ✅ Get All Posts
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    // ✅ Get Post by ID
    public Optional<Post> getPostById(int postId) {
        return postRepository.findById(postId);
    }

    // ✅ Update Post (User can update their own; Admin can update any post)
    public Post updatePost(int postId, String newContent, String email, boolean isAdmin) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (isAdmin || post.getUser().getEmail().equals(email)) {
            post.setContent(newContent);
            return postRepository.save(post);
        } else {
            throw new SecurityException("Not authorized to update this post");
        }
    }

    // ✅ Delete Post (User can delete their own; Admin can delete any post)
    public void deletePost(int postId, String email, boolean isAdmin) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        if (isAdmin || post.getUser().getEmail().equals(email)) {
            postRepository.deleteById(postId);
        } else {
            throw new SecurityException("Not authorized to delete this post");
        }
    }

    // ✅ Like Post: add the user to the likedBy set if not already present.
    public void likePost(int postId, String email) {
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            if (!post.getLikedBy().contains(user)) {
                post.addLike(user);
                postRepository.save(post);
            }
        }
    }

    // ✅ Unlike Post: remove the user from the likedBy set if present.
    public void unlikePost(int postId, String email) {
        Optional<Post> postOpt = postRepository.findById(postId);
        if (postOpt.isPresent()) {
            Post post = postOpt.get();
            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));
            if (post.getLikedBy().contains(user)) {
                post.removeLike(user);
                postRepository.save(post);
            }
        }
    }

    // // ✅ Like Post
    // public void likePost(int postId) {
    //     Optional<Post> post = postRepository.findById(postId);
    //     post.ifPresent(p -> {
    //         p.likePost();
    //         postRepository.save(p);
    //     });
    // }

    // // ✅ Unlike Post
    // public void unlikePost(int postId) {
    //     Optional<Post> post = postRepository.findById(postId);
    //     post.ifPresent(p -> {
    //         p.unlikePost();
    //         postRepository.save(p);
    //     });
    // }
}