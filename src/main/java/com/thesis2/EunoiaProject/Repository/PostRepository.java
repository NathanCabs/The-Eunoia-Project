//package com.thesis2.EunoiaProject.Repository;
//
//import com.thesis2.EunoiaProject.Model.Post;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//
//public interface PostRepository extends JpaRepository<Post, Integer> {
//    List<Post> findByUserId(Integer userId); // Ensured consistency with Integer type
//}
package com.thesis2.EunoiaProject.Repository;

import com.thesis2.EunoiaProject.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Integer> {

    // ✅ Find all posts by a specific user, ordered by latest first
    List<Post> findByUserIdOrderByIdDesc(Integer userId);

    // ✅ Find a specific post by ID and user (for checking ownership)
    Optional<Post> findByIdAndUserId(Integer postId, Integer userId);

    // ✅ Find all posts (latest first)
    List<Post> findAllByOrderByIdDesc();
}
