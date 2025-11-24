import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderService } from '../services/orderService';
import type { Order } from '../types/Order';
import '../assets/css/Orders.css';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await OrderService.getUserOrders();
      setOrders(data);
    } catch (error) {
      console.error('Erreur lors du chargement des commandes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="orders-loading">Chargement des commandes...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="orders-empty">
        <h2>Aucune commande</h2>
        <p>Vous n'avez pas encore passé de commande</p>
        <button onClick={() => navigate('/products')}>
          Voir les produits
        </button>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, string> = {
      PENDING: '⏳ En attente',
      CONFIRMED: '✅ Confirmée',
      SHIPPED: '📦 Expédiée',
      DELIVERED: '🎉 Livrée',
      CANCELLED: '❌ Annulée'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="orders-container">
      <h1>Mes Commandes</h1>

      <div className="orders-list">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="order-card"
            onClick={() => navigate(`/orders/${order.id}`)}
          >
            <div className="order-header">
              <div>
                <h3>Commande #{order.id}</h3>
                <p className="order-date">
                  {new Date(order.orderDate).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
              <span className={`order-status status-${order.status.toLowerCase()}`}>
                {getStatusBadge(order.status)}
              </span>
            </div>

            <div className="order-items">
              {order.items.slice(0, 3).map((item) => (
                <span key={item.id} className="order-item-preview">
                  {item.productName} x{item.quantity}
                </span>
              ))}
              {order.items.length > 3 && (
                <span className="order-item-more">
                  +{order.items.length - 3} autres
                </span>
              )}
            </div>

            <div className="order-footer">
              <span className="order-total">
                Total: {order.totalPrice.toFixed(2)} €
              </span>
              <button className="btn-details">
                Voir les détails →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;