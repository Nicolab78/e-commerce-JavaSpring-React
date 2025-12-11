package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.comment.CommentDto;
import com.example.demo.dto.comment.CreateCommentDto;
import com.example.demo.dto.comment.UpdateCommentDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService implements ICommentService {

    private final CommentRepository commentRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public CommentDto saveComment(Long productId, Long userId, CreateCommentDto createCommentDto) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = Comment.builder()
                .product(product)
                .user(user)
                .rating(createCommentDto.getRating())
                .comment(createCommentDto.getComment())
                .build();

        Comment saved = commentRepository.save(comment);
        return mapToDto(saved);
    }

    @Override
    public List<CommentDto> getCommentsByProductId(Long productId) {
        List<Comment> comments = commentRepository.findByProductIdOrderByCreatedAtDesc(productId);
        return comments.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<CommentDto> getAllComments() {
        return commentRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommentDto getCommentById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        return mapToDto(comment);
    }

    @Override
    public CommentDto updateComment(Long commentId, Long userId, UpdateCommentDto updateCommentDto) {
        Comment existing = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!existing.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to update this comment.");
        }

        existing.setRating(updateCommentDto.getRating());
        existing.setComment(updateCommentDto.getComment());

        Comment updated = commentRepository.save(existing);
        return mapToDto(updated);
    }

    @Override
    public void deleteComment(Long commentId, Long userId) {
        Comment existing = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!existing.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to delete this comment.");
        }

        commentRepository.delete(existing);
    }

    @Override
    public Double getAverageRating(Long productId) {
        Double avg = commentRepository.getAverageRatingByProductId(productId);
        return avg != null ? Math.round(avg * 10.0) / 10.0 : 0.0;
    }

    @Override
    public Long getCommentCount(Long productId) {
        return commentRepository.countByProductId(productId);
    }

    @Override
    public List<CommentDto> getCommentsByUserId(Long userId) {
        List<Comment> comments = commentRepository.findByUserIdOrderByCreatedAtDesc(userId);
        return comments.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private CommentDto mapToDto(Comment comment) {
        return CommentDto.builder()
                .id(comment.getId())
                .userId(comment.getUser().getId())
                .username(comment.getUser().getUsername())
                .productId(comment.getProduct().getId())
                .productName(comment.getProduct().getName())
                .rating(comment.getRating())
                .comment(comment.getComment())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}