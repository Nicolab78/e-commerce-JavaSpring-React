import React , { useEffect, useState } from 'react';
import { ProductService } from "../services/productService";
import type { Product } from "../types/Product";
import { Link } from "react-router-dom";

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
            console.error("Erreur lors du chargement des produits:", err);
            setError("Erreur lors du chargement des produits.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Chargement des produits</div>
    };

    if (error) {
        return <div>{error}</div>
    };

    return (
        <div className="products-page">
            <h1>Nos Produits</h1>

            <div className='products-grid'>
                {products.map((product) => (
                    <div key={product.id} className='product-card'>
                        <img src={product.imageUrl} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p className='price'>{product.price}</p>
                        <Link to={`/products/${product.id}`}>
                            <button className='btn-primary'>Voir Détails</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default Products;










