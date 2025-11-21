package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommentRequestDTO;
import com.example.demo.repository.UserRepository;
import com.example.demo.services.CommentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentService commentService;
    private final UserRepository userRepository;

    @PostMapping("/products/{productId}")
    public ResponseEntity<?> createComment(
            @PathVariable Long productId,
            @Valid @RequestBody CommentRequestDTO request,
            Authentication authentication) {
        try {
            Long userId = getUserIdFromAuth(authentication);
            CommentDTO comment = commentService.saveComment(productId, userId, request);
            return ResponseEntity.status(HttpStatus.CREATED).body(comment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/products/{productId}")
    public ResponseEntity<?> getCommentsByProductId(@PathVariable Long productId) {
        try {
            List<CommentDTO> comments = commentService.getCommentsByProductId(productId);
            return ResponseEntity.ok(comments);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllComments() {
        try {
            List<CommentDTO> comments = commentService.getAllComments();
            return ResponseEntity.ok(comments);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentById(@PathVariable Long id) {
        try {
            CommentDTO comment = commentService.getCommentById(id);
            return ResponseEntity.ok(comment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long commentId,
            @Valid @RequestBody CommentRequestDTO request,
            Authentication authentication) {
        try {
            Long userId = getUserIdFromAuth(authentication);
            CommentDTO comment = commentService.updateComment(commentId, userId, request);
            return ResponseEntity.ok(comment);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication) {
        try {
            Long userId = getUserIdFromAuth(authentication);
            commentService.deleteComment(commentId, userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/products/{productId}/rating")
    public ResponseEntity<?> getAverageRating(@PathVariable Long productId) {
        try {
            Double rating = commentService.getAverageRating(productId);
            return ResponseEntity.ok(rating);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/products/{productId}/count")
    public ResponseEntity<?> getCommentCount(@PathVariable Long productId) {
        try {
            Long count = commentService.getCommentCount(productId);
            return ResponseEntity.ok(count);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> getCommentsByUserId(@PathVariable Long userId) {
        try {
            List<CommentDTO> comments = commentService.getCommentsByUserId(userId);
            return ResponseEntity.ok(comments);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    private Long getUserIdFromAuth(Authentication authentication) {
        System.out.println("=== getUserIdFromAuth ===");

        if (authentication == null) {
            throw new RuntimeException("No authentication found");
        }

        String identifier = authentication.getName();
        System.out.println("Identifier extrait du JWT: " + identifier);

        return userRepository.findByUsername(identifier)
                .or(() -> userRepository.findByEmail(identifier))
                .orElseThrow(() -> new RuntimeException("User not found with identifier: " + identifier))
                .getId();
    }
}