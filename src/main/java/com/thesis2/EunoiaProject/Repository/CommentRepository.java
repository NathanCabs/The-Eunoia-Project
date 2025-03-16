//package com.thesis2.EunoiaProject.Repository;
//
//import com.thesis2.EunoiaProject.Model.Comment;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//
//public interface CommentRepository extends JpaRepository<Comment, Integer> {
//    List<Comment> findByPostId(Integer postId); // Ensured consistency with Integer type
//}
package com.thesis2.EunoiaProject.Repository;

import com.thesis2.EunoiaProject.Model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Integer> {

    // ✅ Find all comments by a post ID, ordered by latest first
    List<Comment> findByPostIdOrderByIdDesc(Integer postId);

    // ✅ Find a specific comment by ID and user ID (for checking ownership)
    Optional<Comment> findByIdAndUserId(Integer commentId, Integer userId);

    // ✅ Find all comments by user ID (useful for user's comment history)
    List<Comment> findByUserIdOrderByIdDesc(Integer userId);

    List<Comment> findByPostId(int postId);
}
