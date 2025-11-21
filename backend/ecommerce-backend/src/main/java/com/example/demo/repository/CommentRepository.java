package com.example.demo.repository;

import com.example.demo.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByProductIdOrderByCreatedAtDesc(Long productId);

    List<Comment> findByUserIdOrderByCreatedAtDesc(Long userId);

    Long countByProductId(Long productId);

    @Query("SELECT AVG(c.rating) FROM Comment c WHERE c.product.id = :productId")
    Double getAverageRatingByProductId(Long productId);

    boolean existsByProductIdAndUserId(Long productId, Long userId);
}