package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommentRequestDTO;
import com.example.demo.entity.Comment;
import com.example.demo.entity.Product;
import com.example.demo.entity.User;
import com.example.demo.repository.CommentRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService implements ICommentService {

    private final CommentRepository commentRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Override
    public CommentDTO saveComment(Long productId, Long userId, CommentRequestDTO request) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found."));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found."));

        Comment comment = mapToEntity(request, product, user);

        Comment savedComment = commentRepository.save(comment);
        return mapToDto(savedComment);
    }

    @Override
    public List<CommentDTO> getCommentsByProductId(Long productId) {
        List<Comment> comments = commentRepository.findByProductIdOrderByCreatedAtDesc(productId);

        return comments.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentDTO> getAllComments() {
        List<Comment> comments = commentRepository.findAll();

        return comments.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommentDTO getCommentById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Comment not found."));

        return mapToDto(comment);
    }

    @Override
    public CommentDTO updateComment(Long commentId, Long userId, CommentRequestDTO request) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found."));

        if (!existingComment.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to update this comment.");
        }

        existingComment.setRating(request.getRating());
        existingComment.setComment(request.getComment());

        Comment updatedComment = commentRepository.save(existingComment);
        return mapToDto(updatedComment);
    }

    @Override
    public void deleteComment(Long commentId, Long userId) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found."));

        if (!existingComment.getUser().getId().equals(userId)) {
            throw new RuntimeException("You are not authorized to delete this comment.");
        }

        commentRepository.delete(existingComment);
    }

    @Override
    public Double getAverageRating(Long productId) {
        Double average = commentRepository.getAverageRatingByProductId(productId);
        return average != null ? Math.round(average * 10.0) / 10.0 : 0.0;
    }

    @Override
    public Long getCommentCount(Long productId) {
        return commentRepository.countByProductId(productId);
    }

    @Override
    public List<CommentDTO> getCommentsByUserId(Long userId) {
        List<Comment> comments = commentRepository.findByUserIdOrderByCreatedAtDesc(userId);

        return comments.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private Comment mapToEntity(CommentRequestDTO dto, Product product, User user) {
        Comment comment = new Comment();
        comment.setProduct(product);
        comment.setUser(user);
        comment.setRating(dto.getRating());
        comment.setComment(dto.getComment());
        comment.setCreatedAt(LocalDateTime.now());
        return comment;
    }

    private CommentDTO mapToDto(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setUserId(comment.getUser().getId());
        dto.setUserName(comment.getUser().getUsername());
        dto.setProductId(comment.getProduct().getId());
        dto.setRating(comment.getRating());
        dto.setComment(comment.getComment());
        dto.setCreatedAt(comment.getCreatedAt().format(DateTimeFormatter.ISO_DATE_TIME));
        return dto;
    }
}