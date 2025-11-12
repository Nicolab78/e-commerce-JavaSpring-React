import React from 'react';
import type { Comment } from '../types/Comment';
import '../assets/css/CommentItem.css';

interface CommentItemProps {
  comment: Comment;
  currentUserId?: number;
  onDelete?: (commentId: number) => void;
  onEdit?: (comment: Comment) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ 
  comment, 
  currentUserId,
  onDelete,
  onEdit
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOwner = currentUserId === comment.userId;

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-user-info">
          <strong>{comment.userName}</strong>
          <div className="star-rating-display">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`star ${star <= comment.rating ? 'filled' : 'empty'}`}>
                {star <= comment.rating ? '★' : '☆'}
              </span>
            ))}
          </div>
        </div>
        <span className="comment-date">{formatDate(comment.createdAt)}</span>
      </div>
      
      <p className="comment-text">{comment.comment}</p>
      
      {isOwner && (
        <div className="comment-actions">
          {onEdit && (
            <button onClick={() => onEdit(comment)} className="btn-edit">
              Modifier
            </button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(comment.id)} className="btn-delete">
              Supprimer
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentItem;