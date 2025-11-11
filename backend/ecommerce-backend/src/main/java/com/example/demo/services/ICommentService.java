package com.example.demo.services;

import java.util.List;
import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommentRequestDTO;

public interface ICommentService {
    
    CommentDTO saveComment(Long productId, Long userId, CommentRequestDTO request);
    
    List<CommentDTO> getCommentsByProductId(Long productId);
    
    List<CommentDTO> getAllComments();
    
    CommentDTO getCommentById(Long id);
    
    CommentDTO updateComment(Long commentId, Long userId, CommentRequestDTO request);
    
    void deleteComment(Long commentId, Long userId);
    
    Double getAverageRating(Long productId);
    
    Long getCommentCount(Long productId);
    
    List<CommentDTO> getCommentsByUserId(Long userId);
}