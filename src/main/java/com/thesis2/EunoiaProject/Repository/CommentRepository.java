package com.thesis2.EunoiaProject.Repository;

import com.thesis2.EunoiaProject.Model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
    List<Comment> findByPostId(Integer postId); // Ensured consistency with Integer type
}
