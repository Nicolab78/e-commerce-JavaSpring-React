import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import type { Product } from '../types/Product';
import { motion } from 'framer-motion';
import '../assets/css/ProductDetailCard.css';

interface ProductDetailCardProps {
  product: Product;
  currentUserId?: number;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product, currentUserId }) => {
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState(false);

  return (
    <>
      <div className="product-detail">
        <button onClick={() => navigate('/products')}>← Retour</button>
        <div className="product-detail-content">
          <img src={product.imageUrl} alt={product.name} />
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="category">{product.category.name}</p>
            <p className="description">{product.description}</p>
            <p className="price">{product.price} €</p>
            <p className="stock">
              {product.stockQuantity > 0 
                ? `En stock (${product.stockQuantity})` 
                : 'Rupture de stock'}
            </p>
            <button disabled={product.stockQuantity === 0}>
              Ajouter au panier
            </button>

            <button onClick={() => setShowComments(prev => !prev)} className="btn-toggle-comments">
              {showComments ? 'Masquer les commentaires' : 'Afficher les commentaires'}
            </button>
          </div>
        </div>
      </div>

      {showComments && (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    <CommentSection productId={product.id} currentUserId={currentUserId} />
  </motion.div>
)}
    </>
  );
};

export default ProductDetailCard;