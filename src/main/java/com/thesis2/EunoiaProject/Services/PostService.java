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
    private final UserRepository userRepository; // Added UserRepository to fetch users

    public PostService(PostRepository postRepository, UserRepository userRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public Post createPost(int userId, String content) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            Post post = new Post(user.get(), content);
            return postRepository.save(post);
        }
        return null;
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Optional<Post> getPostById(int postId) {
        return postRepository.findById(postId);
    }

    public Post updatePost(int postId, String newContent) {
        Optional<Post> post = postRepository.findById(postId);
        if (post.isPresent()) {
            Post updatedPost = post.get();
            updatedPost.setContent(newContent);
            return postRepository.save(updatedPost);
        }
        return null;
    }

    public void deletePost(int postId) {
        postRepository.deleteById(postId);
    }

    public void likePost(int postId) {
        Optional<Post> post = postRepository.findById(postId);
        post.ifPresent(p -> {
            p.likePost();
            postRepository.save(p);
        });
    }

    public void unlikePost(int postId) {
        Optional<Post> post = postRepository.findById(postId);
        post.ifPresent(p -> {
            p.unlikePost();
            postRepository.save(p);
        });
    }
}
