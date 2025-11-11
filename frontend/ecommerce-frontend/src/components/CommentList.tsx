import React from 'react';
import CommentItem from './CommentItem';
import type { Comment } from '../types/Comment';

interface CommentListProps {
  comments: Comment[];
  currentUserId?: number;
  onDelete?: (commentId: number) => void;
  onEdit?: (comment: Comment) => void;
}

const CommentList: React.FC<CommentListProps> = ({ 
  comments, 
  currentUserId,
  onDelete,
  onEdit
}) => {
  if (comments.length === 0) {
    return (
      <div className="no-comments">
        <p>Aucun avis pour le moment. Soyez le premier à donner votre avis !</p>
      </div>
    );
  }

  return (
    <div className="comment-list">
      <h3>Avis clients ({comments.length})</h3>
      <div className="comments-container">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            currentUserId={currentUserId}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentList;