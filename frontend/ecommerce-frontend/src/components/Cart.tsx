import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItemCard from './CartItemCard';
import '../assets/css/Cart.css';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cart, loading, clearCart } = useCart();

  if (loading) {
    return <div className="cart-loading">Chargement du panier...</div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Votre panier est vide</h2>
        <p>Ajoutez des produits pour commencer vos achats</p>
        <button onClick={() => navigate('/products')}>
          Voir les produits
        </button>
      </div>
    );
  }

  const handleClearCart = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      try {
        await clearCart();
      } catch (error) {
        alert('Erreur lors du vidage du panier');
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Mon Panier</h1>
        <button onClick={handleClearCart} className="btn-clear">
          Vider le panier
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        <div className="cart-summary">
          <h2>Récapitulatif</h2>
          <div className="summary-line">
            <span>Articles ({cart.items.length})</span>
            <span>{cart.totalPrice.toFixed(2)} €</span>
          </div>
          <div className="summary-line total">
            <span>Total</span>
            <span>{cart.totalPrice.toFixed(2)} €</span>
          </div>
          <button onClick={handleCheckout} className="btn-checkout">
            Passer la commande
          </button>
          <button onClick={() => navigate('/products')} className="btn-continue">
            Continuer mes achats
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;