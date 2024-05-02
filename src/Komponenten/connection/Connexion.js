import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './Connexion.css';

const Connexion = () => {
  const [benutzername, setBenutzername] = useState('');
  const [passwort, setPasswort] = useState('');
  const [fehlermeldung, setFehlermeldung] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: benutzername, password: passwort }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login fehlgeschlagen');
      }

      const userData = await response.json();
      setUser({ isConnected: true, username: userData.username });
      navigate('/neue-notiz');  // Assurez-vous que cette redirection est ce que vous souhaitez
    } catch (error) {
      setFehlermeldung(error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h3>Login</h3>
            <div className="form-group">
              <label>Benutzername:</label>
              <input
                type="text"
                className="form-control"
                value={benutzername}
                onChange={(e) => setBenutzername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Passwort:</label>
              <input
                type="password"
                className="form-control"
                value={passwort}
                onChange={(e) => setPasswort(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">Einloggen</button>
            {fehlermeldung && <div className="alert alert-danger" role="alert">{fehlermeldung}</div>}
            <p className="mt-3">
              Noch kein Konto? <Link to="/register">Hier registrieren</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
