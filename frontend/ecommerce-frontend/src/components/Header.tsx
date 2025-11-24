import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../assets/css/Header.css';

const Header: React.FC = () => {
  const { cart } = useCart();
  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header>
  <nav className="header-nav">
    <div className="nav-left">
      <Link to="/">Accueil</Link>
      <Link to="/products">Produits</Link>
      <Link to="/cart" className="cart-link">
        🛒 Panier
        {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
      </Link>
      <Link to="/orders">Mes commandes</Link>
    </div>

    <div className="nav-right">
      {isAuthenticated ? (
        <>
          <span>Bonjour, {user?.username} !</span>
          <button onClick={handleLogout}>Déconnexion</button>
        </>
      ) : (
        <>
          <Link to="/login">Connexion</Link>
          <Link to="/register">Inscription</Link>
        </>
      )}
    </div>
  </nav>
</header>
  );
};

export default Header;