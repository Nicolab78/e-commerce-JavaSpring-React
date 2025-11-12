import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../assets/css/Header.css';

const Header: React.FC = () => {
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