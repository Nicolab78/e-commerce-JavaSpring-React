import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import type { CartItem } from '../types/Carts';
import '../assets/css/CartItemCard.css';

interface CartItemCardProps {
  item: CartItem;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      setLoading(true);
      setQuantity(newQuantity);
      await updateQuantity(item.id, newQuantity);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      setQuantity(item.quantity); 
      alert('Erreur lors de la mise à jour de la quantité');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    if (window.confirm('Supprimer cet article du panier ?')) {
      try {
        setLoading(true);
        await removeItem(item.id);
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className={`cart-item-card ${loading ? 'loading' : ''}`}>
      <img src={item.productImageUrl} alt={item.productName} />
      
      <div className="item-details">
        <h3>{item.productName}</h3>
        <p className="item-price">{item.productPrice.toFixed(2)} €</p>
      </div>

      <div className="item-actions">
        <div className="quantity-controls">
          <button 
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={loading || quantity <= 1}
          >
            -
          </button>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val) && val > 0) {
                handleQuantityChange(val);
              }
            }}
            disabled={loading}
            min="1"
          />
          <button 
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={loading}
          >
            +
          </button>
        </div>

        <div className="item-subtotal">
          <span>Sous-total: {item.subtotal.toFixed(2)} €</span>
        </div>

        <button 
          onClick={handleRemove} 
          className="btn-remove"
          disabled={loading}
        >
          🗑️ Supprimer
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;