import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import type { Product } from '../types/Product';
import { motion } from 'framer-motion';
import '../assets/css/ProductDetailCard.css';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface ProductDetailCardProps {
  product: Product;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product}) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [adding, setAdding] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour ajouter au panier');
      return;
    }

    try {
      setAdding(true);
      await addToCart(product.id, 1);
      alert('Produit ajouté au panier !');
    } catch (error) {
      alert('Erreur lors de l\'ajout au panier');
    } finally {
      setAdding(false);
    }
  };

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
            <button onClick={handleAddToCart}
            disabled={product.stockQuantity === 0 || adding}
           >
          {adding ? 'Ajout...' : 'Ajouter au panier'}
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
    <CommentSection productId={product.id}/>
  </motion.div>
)}
    </>
  );
};

export default ProductDetailCard;