import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { CommentService } from '../services/commentService';
import type { Comment } from '../types/Comment';
import '../assets/css/CommentSection.css';

interface CommentSectionProps {
  productId: number;
  currentUserId?: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ productId, currentUserId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [editingComment, setEditingComment] = useState<Comment | null>(null);

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await CommentService.getCommentsByProductId(productId);
      setComments(data);
    } catch (err: any) {
      console.error('Erreur lors du chargement des commentaires:', err);
      setError('');
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (rating: number, comment: string) => {
    if (!currentUserId) {
      alert('Vous devez être connecté pour laisser un avis');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      
      if (editingComment) {
        const updatedComment = await CommentService.updateComment(
          editingComment.id,
          currentUserId,
          rating,
          comment
        );
        setComments(comments.map(c => c.id === updatedComment.id ? updatedComment : c));
        setEditingComment(null);
      } else {
        const newComment = await CommentService.addComment(productId, currentUserId, rating, comment);
        setComments([newComment, ...comments]);
      }
    } catch (err: any) {
      console.error('Erreur lors de l\'ajout du commentaire:', err);
      setError(err.response?.data || 'Erreur lors de l\'ajout du commentaire');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!currentUserId) return;

    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        await CommentService.deleteComment(commentId, currentUserId);
        setComments(comments.filter(c => c.id !== commentId));
      } catch (err: any) {
        console.error('Erreur lors de la suppression:', err);
        alert(err.response?.data || 'Erreur lors de la suppression');
      }
    }
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
  };

  return (
    <div className="comment-section">
      {currentUserId && (
        <div>
          {editingComment && (
            <div className="edit-mode-banner">
              <span>Mode édition</span>
              <button onClick={handleCancelEdit} className="btn-cancel">
                Annuler
              </button>
            </div>
          )}
          <CommentForm 
            onSubmit={handleSubmitComment} 
            loading={submitting}
            initialRating={editingComment?.rating}
            initialComment={editingComment?.comment}
            buttonText={editingComment ? 'Modifier' : 'Publier'}
          />
        </div>
      )}

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p>Chargement des commentaires...</p>
      ) : (
        <CommentList 
          comments={comments} 
          currentUserId={currentUserId}
          onDelete={handleDeleteComment}
          onEdit={handleEditComment}
        />
      )}
    </div>
  );
};

export default CommentSection;