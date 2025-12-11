import React from 'react';
import { Link } from 'react-router-dom';

import '../assets/css/Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>E-Commerce</h3>
            <p>Votre boutique en ligne de confiance</p>
          </div>

          <div className="footer-section">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/products">Produits</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Compte</h4>
            <ul>
              <li><Link to="/login">Connexion</Link></li>
              <li><Link to="/register">Inscription</Link></li>
              <li><Link to="/orders">Mes commandes</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: contact@ecommerce.com</p>
            <p>Tél: +33 1 23 45 67 89</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 E-Commerce. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;