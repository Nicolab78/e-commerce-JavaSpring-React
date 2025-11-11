import React from 'react';
import { useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import type { Product } from '../types/Product';

interface ProductDetailCardProps {
  product: Product;
  currentUserId?: number;
}

const ProductDetailCard: React.FC<ProductDetailCardProps> = ({ product, currentUserId }) => {
  const navigate = useNavigate();

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
          </div>
        </div>
      </div>
      
      <CommentSection productId={product.id} currentUserId={currentUserId} />
    </>
  );
};

export default ProductDetailCard;