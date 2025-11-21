import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import { motion } from 'framer-motion';
import { CommentService } from '../services/commentService';
import type { Comment } from '../types/Comment';
import { useAuth } from '../context/AuthContext';   
import '../assets/css/CommentSection.css';

interface CommentSectionProps {
  productId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ productId }) => {
  const { isAuthenticated, user } = useAuth();   
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [editingComment, setEditingComment] = useState<Comment | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

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
  if (!user) {
    alert('Vous devez être connecté pour laisser un avis');
    return;
  }

  try {
    setSubmitting(true);
    setError('');

    if (editingComment) {
      const updatedComment = await CommentService.updateComment(
        editingComment.id,
        rating,
        comment
      );
      setComments(comments.map(c => c.id === updatedComment.id ? updatedComment : c));
      setEditingComment(null);
    } else {
      const newComment = await CommentService.addComment(productId, rating, comment);
      setComments([newComment, ...comments]);
    }

    setShowForm(false);
  } catch (err: any) {
    console.error('Erreur lors de l\'ajout du commentaire:', err);
    setError(err.response?.data || 'Erreur lors de l\'ajout du commentaire');
  } finally {
    setSubmitting(false);
  }
};

const handleDeleteComment = async (commentId: number) => {
  if (!user) return;

  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
    try {
      await CommentService.deleteComment(commentId);
      setComments(comments.filter(c => c.id !== commentId));
    } catch (err: any) {
      console.error('Erreur lors de la suppression:', err);
      alert(err.response?.data || 'Erreur lors de la suppression');
    }
  }
};

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setShowForm(false); 
  };

  return (
    <div className="comment-section">
      {isAuthenticated && (
        <>
          <button
            className="btn-toggle-comments"
            onClick={() => setShowForm(prev => !prev)}
          >
            {showForm ? "Masquer le formulaire" : "Laisser un commentaire"}
          </button>

          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <CommentForm
                onSubmit={handleSubmitComment}
                loading={submitting}
                initialRating={editingComment?.rating}
                initialComment={editingComment?.comment}
                buttonText={editingComment ? "Modifier" : "Publier"}
              />
            </motion.div>
          )}
        </>
      )}

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <p>Chargement des commentaires...</p>
      ) : (
        <CommentList 
          comments={comments} 
          currentUserId={user?.id} 
          onDelete={handleDeleteComment}
          onEdit={handleEditComment}
        />
      )}
    </div>
  );
};

export default CommentSection;