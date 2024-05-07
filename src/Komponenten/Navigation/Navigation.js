// Navigation.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Navigation.css';

const Navigation = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navigation-bar">
      <Link to="/home" className="nav-link">Home</Link>
      {user ? (
        <>
          <Link to="/notizen" className="nav-link">Notiz Liste</Link>
          <Link to="/neue-notiz" className="nav-link">Neue Notiz</Link>
          <span className="nav-link">Hi, {user.username}</span>
          <button onClick={handleLogout} className="nav-link">Logout</button>
        </>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default Navigation;
