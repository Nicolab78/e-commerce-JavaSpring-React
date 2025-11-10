import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthService } from '../services/authService';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newUser = {
        username,
        email,
        password,
        role: 'USER',
        active: true,
        phoneNumber: phoneNumber || undefined,
      };
      
      await AuthService.register(newUser);
      alert('Inscription réussie !');
      navigate('/login');
    } catch (err) {
      setError('Erreur lors de l\'inscription');
      console.error(err);
    }
  };

  return (
    <div className="register-page">
      <h1>Inscription</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
        </div>
        
        <div className="form-group">
          <label>Téléphone (optionnel)</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        
        {error && <p className="error">{error}</p>}
        
        <button type="submit">S'inscrire</button>
      </form>
      
      <p>
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </div>
  );
};

export default Register;