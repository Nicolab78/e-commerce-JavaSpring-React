import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import '../assets/css/Header.css';

const Header: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>E-Commerce</h1>
          </Link>

          <nav className="nav">
            <Link to="/">Accueil</Link>
            <Link to="/products">Produits</Link>
          </nav>

          <div className="header-actions">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="cart-link">
                  🛒 Panier {itemCount > 0 && <span className="badge">{itemCount}</span>}
                </Link>
                <Link to="/orders">Mes commandes</Link>
                <span className="user-name">Bonjour, {user?.username}</span>
                <button onClick={handleLogout} className="btn-logout">
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">
                  Connexion
                </Link>
                <Link to="/register" className="btn-register">
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;