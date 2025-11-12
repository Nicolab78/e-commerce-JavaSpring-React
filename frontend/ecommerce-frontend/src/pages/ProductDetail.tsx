import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductService } from '../services/productService';
import ProductDetailCard from '../components/ProductDetailCard';
import { useAuth } from '../context/AuthContext';
import type { Product } from '../types/Product';


const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth(); 
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
    <ProductDetailCard 
      product={product} 
      currentUserId={user?.id} 
    />
  );
};

export default ProductDetail;