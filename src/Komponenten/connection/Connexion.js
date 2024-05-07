// Connexion.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Importez `Link` pour la navigation
import { UserContext } from '../../contexts/UserContext';
import './Connexion.css';

const Connexion = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      login(userData.user.username);
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-3">
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          {error && <div className="alert alert-danger" role="alert">{error}</div>}
        </form>
        <div className="mt-3">
          <p>Pas de compte ? <Link to="/register">S'inscrire</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
