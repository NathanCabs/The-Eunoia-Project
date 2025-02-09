package com.thesis2.EunoiaProject.Repository;

import com.thesis2.EunoiaProject.Model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {
    List<Post> findByUserId(Integer userId); // Ensured consistency with Integer type
}
