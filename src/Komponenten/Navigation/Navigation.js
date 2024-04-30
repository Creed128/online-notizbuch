// src/Komponenten/Navigation/Navigation.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Navigation.css';

const Navigation = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Rediriger vers la page de connexion après la déconnexion
  };

  return (
    <nav className="navigation-bar">
      <Link to="/home" className="nav-link">Home</Link>
      {user ? (
        <>
          <button onClick={handleLogout} className="nav-link">logout</button>
          {/* Retiré le bouton "Notiz erstellen" */}
        </>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
