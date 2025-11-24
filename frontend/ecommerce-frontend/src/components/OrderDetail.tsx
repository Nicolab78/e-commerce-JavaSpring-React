import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { OrderService } from '../services/orderService';
import type { Order } from '../types/Order';
import '../assets/css/OrderDetail.css';

const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const successMessage = location.state?.message;

  useEffect(() => {
    if (id) {
      loadOrder(parseInt(id));
    }
  }, [id]);

  const loadOrder = async (orderId: number) => {
    try {
      setLoading(true);
      const data = await OrderService.getOrderById(orderId);
      setOrder(data);
    } catch (err: any) {
      console.error('Erreur lors du chargement de la commande:', err);
      setError('Commande introuvable');
    } finally {
      setLoading(false);
    }
  };

  const getStatusInfo = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      PENDING: { label: '⏳ En attente', color: '#ffc107' },
      CONFIRMED: { label: '✅ Confirmée', color: '#28a745' },
      SHIPPED: { label: '📦 Expédiée', color: '#17a2b8' },
      DELIVERED: { label: '🎉 Livrée', color: '#28a745' },
      CANCELLED: { label: '❌ Annulée', color: '#dc3545' }
    };
    return statusMap[status] || { label: status, color: '#6c757d' };
  };

  if (loading) {
    return <div className="order-detail-loading">Chargement de la commande...</div>;
  }

  if (error || !order) {
    return (
      <div className="order-detail-error">
        <h2>Erreur</h2>
        <p>{error || 'Commande introuvable'}</p>
        <button onClick={() => navigate('/orders')}>
          Retour aux commandes
        </button>
      </div>
    );
  }

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="order-detail-container">
      {successMessage && (
        <div className="success-message">
          {successMessage}
        </div>
      )}

      <div className="order-detail-header">
        <button onClick={() => navigate('/orders')} className="btn-back">
          ← Retour aux commandes
        </button>
        <h1>Commande #{order.id}</h1>
      </div>

      <div className="order-detail-content">
        {/* Informations de la commande */}
        <div className="order-info-card">
          <h2>Informations de la commande</h2>
          
          <div className="info-row">
            <span className="info-label">Statut</span>
            <span 
              className="order-status-badge"
              style={{ backgroundColor: statusInfo.color }}
            >
              {statusInfo.label}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Date de commande</span>
            <span className="info-value">
              {new Date(order.orderDate).toLocaleString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>

          <div className="info-row">
            <span className="info-label">Adresse de livraison</span>
            <span className="info-value">{order.shippingAddress}</span>
          </div>

          <div className="info-row total-row">
            <span className="info-label">Total</span>
            <span className="info-value total">{order.totalPrice.toFixed(2)} €</span>
          </div>
        </div>

        {/* Articles commandés */}
        <div className="order-items-card">
          <h2>Articles commandés ({order.items.length})</h2>
          
          <div className="order-items-list">
            {order.items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <h3>{item.productName}</h3>
                  <p className="item-price">{item.price.toFixed(2)} € × {item.quantity}</p>
                </div>
                <div className="item-subtotal">
                  {(item.price * item.quantity).toFixed(2)} €
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <span>Sous-total</span>
              <span>{order.totalPrice.toFixed(2)} €</span>
            </div>
            <div className="summary-row">
              <span>Livraison</span>
              <span className="free">Gratuite</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{order.totalPrice.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="order-actions">
        <button 
          onClick={() => navigate('/products')}
          className="btn-continue-shopping"
        >
          Continuer mes achats
        </button>
        {order.status === 'PENDING' && (
          <button className="btn-cancel-order">
            Annuler la commande
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;