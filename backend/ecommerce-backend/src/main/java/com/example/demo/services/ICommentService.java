package com.example.demo.services;

import java.util.List;

import com.example.demo.dto.comment.CommentDto;
import com.example.demo.dto.comment.CreateCommentDto;
import com.example.demo.dto.comment.UpdateCommentDto;

public interface ICommentService {

    CommentDto saveComment(Long productId, Long userId, CreateCommentDto createCommentDto);

    List<CommentDto> getCommentsByProductId(Long productId);

    List<CommentDto> getAllComments();

    CommentDto getCommentById(Long id);

    CommentDto updateComment(Long commentId, Long userId, UpdateCommentDto updateCommentDto);

    void deleteComment(Long commentId, Long userId);

    Double getAverageRating(Long productId);

    Long getCommentCount(Long productId);

    List<CommentDto> getCommentsByUserId(Long userId);
}