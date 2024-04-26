// src/Komponenten/Navigation/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation-bar">
      <Link to="/home" className="nav-link">Home</Link>
      <Link to="/login" className="nav-link">Login</Link>
    </nav>
  );
};

export default Navigation;
