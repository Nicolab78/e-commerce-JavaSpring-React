import React, { useState } from 'react';

interface CommentFormProps {
  onSubmit: (rating: number, comment: string) => void;
  loading?: boolean;
  initialRating?: number;
  initialComment?: string;
  buttonText?: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ 
  onSubmit, 
  loading = false,
  initialRating = 0,
  initialComment = '',
  buttonText = 'Publier'
}) => {
  const [rating, setRating] = useState<number>(initialRating);
  const [comment, setComment] = useState<string>(initialComment);
  const [hoveredRating, setHoveredRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && comment.trim().length >= 10) {
      onSubmit(rating, comment);
    }
  };

  const handleStarClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <h3>Laisser un avis</h3>
      
      <div className="form-group">
        <label>Votre note :</label>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= (hoveredRating || rating) ? 'filled' : 'empty'}`}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
            >
              {star <= (hoveredRating || rating) ? '★' : '☆'}
            </span>
          ))}
        </div>
        {rating === 0 && <span className="error-text">Veuillez sélectionner une note</span>}
      </div>

      <div className="form-group">
        <label>Votre commentaire :</label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Partagez votre expérience (minimum 10 caractères)..."
          rows={4}
          required
          minLength={10}
          maxLength={1000}
        />
        <span className="char-count">{comment.length}/1000 caractères</span>
      </div>

      <button 
        type="submit" 
        disabled={loading || rating === 0 || comment.trim().length < 10}
        className="btn-primary"
      >
        {loading ? 'Envoi...' : buttonText}
      </button>
    </form>
  );
};

export default CommentForm;