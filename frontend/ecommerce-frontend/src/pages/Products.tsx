import React, { useEffect, useState } from 'react';
import { ProductService } from '../services/productService';
import ProductList from '../components/ProductList';
import type { Product } from '../types/Product';
import '../assets/css/Products.css';


const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Erreur lors du chargement des produits:', err);
      setError('Erreur lors du chargement des produits.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Chargement des produits...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="products-page">
      <h1>Nos Produits</h1>
      <ProductList products={products} />
    </div>
  );
};

export default Products;