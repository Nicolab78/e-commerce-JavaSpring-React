import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductService } from '../services/productService';
import type { Product } from '../types/Product';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      setLoading(true);
      const data = await ProductService.getProductById(productId);
      setProduct(data);
    } catch (err) {
      setError('Produit introuvable');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Produit introuvable</div>;

  return (
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
  );
};

export default ProductDetail;