import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { OrderService } from '../services/orderService';
import '../assets/css/Checkout.css';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, refreshCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!cart || cart.items.length === 0) {
    return (
      <div className="checkout-empty">
        <h2>Votre panier est vide</h2>
        <button onClick={() => navigate('/products')}>
          Voir les produits
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (shippingAddress.length < 10) {
      setError('L\'adresse doit contenir au moins 10 caractères');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const order = await OrderService.createOrder(shippingAddress);
      
      await refreshCart();
      
      navigate(`/orders/${order.id}`, { 
        state: { message: 'Commande passée avec succès !' } 
      });
    } catch (err: any) {
      console.error('Erreur lors de la commande:', err);
      setError(err.response?.data || 'Erreur lors de la création de la commande');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h1>Finaliser la commande</h1>

      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Adresse de livraison</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Entrez votre adresse complète de livraison..."
              rows={5}
              required
              minLength={10}
              maxLength={500}
            />
            
            {error && <div className="error-message">{error}</div>}

            <button 
              type="submit" 
              disabled={loading || !shippingAddress}
              className="btn-submit"
            >
              {loading ? 'Traitement...' : 'Confirmer la commande'}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h2>Récapitulatif</h2>
          
          <div className="summary-items">
            {cart.items.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.productName} x{item.quantity}</span>
                <span>{item.subtotal.toFixed(2)} €</span>
              </div>
            ))}
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>{cart.totalPrice.toFixed(2)} €</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;