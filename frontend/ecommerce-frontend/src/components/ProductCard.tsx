import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/Product';
import '../assets/css/ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{product.price} €</p>
      <Link to={`/products/${product.id}`}>
        <button className="btn-primary">Voir Détails</button>
      </Link>
    </div>
  );
};

export default ProductCard;