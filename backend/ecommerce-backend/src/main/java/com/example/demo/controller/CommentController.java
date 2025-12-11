package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.comment.CommentDto;
import com.example.demo.dto.comment.CreateCommentDto;
import com.example.demo.dto.comment.UpdateCommentDto;
import com.example.demo.services.CommentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/product/{productId}/user/{userId}")
    public ResponseEntity<?> createComment(
            @PathVariable Long productId,
            @PathVariable Long userId,
            @RequestBody CreateCommentDto createCommentDto) {
        try {
            CommentDto comment = commentService.saveComment(productId, userId, createCommentDto);
            return new ResponseEntity<>(comment, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getCommentsByProduct(@PathVariable Long productId) {
        try {
            List<CommentDto> comments = commentService.getCommentsByProductId(productId);
            return ResponseEntity.ok(comments);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getCommentsByUser(@PathVariable Long userId) {
        try {
            List<CommentDto> comments = commentService.getCommentsByUserId(userId);
            return ResponseEntity.ok(comments);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllComments() {
        try {
            List<CommentDto> comments = commentService.getAllComments();
            return ResponseEntity.ok(comments);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentById(@PathVariable Long id) {
        try {
            CommentDto comment = commentService.getCommentById(id);
            return ResponseEntity.ok(comment);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{commentId}/user/{userId}")
    public ResponseEntity<?> updateComment(
            @PathVariable Long commentId,
            @PathVariable Long userId,
            @RequestBody UpdateCommentDto updateCommentDto) {
        try {
            CommentDto comment = commentService.updateComment(commentId, userId, updateCommentDto);
            return ResponseEntity.ok(comment);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{commentId}/user/{userId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long commentId,
            @PathVariable Long userId) {
        try {
            commentService.deleteComment(commentId, userId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/product/{productId}/average")
    public ResponseEntity<?> getAverageRating(@PathVariable Long productId) {
        try {
            Double average = commentService.getAverageRating(productId);
            return ResponseEntity.ok(average);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/product/{productId}/count")
    public ResponseEntity<?> getCommentCount(@PathVariable Long productId) {
        try {
            Long count = commentService.getCommentCount(productId);
            return ResponseEntity.ok(count);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}