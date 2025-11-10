import React , { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { CategoryService } from '../services/categoryService';
import { ProductService } from '../services/productService';

import type { Category } from '../types/Category';
import type { Product } from '../types/Product';

const Home: React.FC = () => {

    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [categories, setGategories] = useState<Category[]>([]);
    const [loading, setloading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            setloading(true);

            const [products, cats] = await Promise.all([
                ProductService.getFeaturedProducts(),
                CategoryService.getAllCategories()
            ]);

            setFeaturedProducts(products);
            setGategories(cats);

        } catch (err) {
            console.error("Erreur lors du chargement:", err);
            setError("Erreur lors du chargement des données.");
        } finally {
            setloading(false);
        }
    };

    return (
        <div className='home'>
            <section className='hero-section'>
                <h1>Bienvenue sur notre E commerce</h1>
                <p>Découvrez nos produits de qualités</p>

                <Link to='/products' >
                    <button className='btn-primary'>Voir tout les produits</button>
                </Link>
            </section>

            <section className='categories-section'>
                <h2>Nos Catégories</h2>
                <div className='categories-grid'>
                    {categories.map((category) => (

                        <Link
                            key={category.id}
                            to={`/products?category=${category.id}`}
                            className='category-card'
                        >
                            <div className='category-icon'>📦</div>
                            <h3>{category.name}</h3>
                            <h3>{category.description}</h3>

                        </Link>
                        
                            
                    )
                    )}
                </div>

            </section>

            <section className="featured-products">
                <h2>Produits Populaires</h2>
                <div className="products-grid">
                {featuredProducts.map((product) => (
                    
                    <div key={product.id} className="product-card">
                    <Link to={`/products/${product.id}`}>
                        
                        <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        />

                        <h3>{product.name}</h3>
                        <p className="category-tag">{product.category.name}</p>
                        <p className="price">{product.price} €</p>
                        <p className="stock">Stock: {product.stockQuantity}</p>
                        <button className="btn-secondary">Voir détails</button>
                    </Link>
                    </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/products">
            <button className="btn-outline">Voir tous les produits →</button>
          </Link>
        </div>
      </section>

        </div>
    );
}

export default Home;