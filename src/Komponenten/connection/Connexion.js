import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link here
import { GoogleLogin } from '@leecheuk/react-google-login';
import { UserContext } from '../../contexts/UserContext';
import './Connexion.css';

const Connexion = () => {
  const [benutzername, setBenutzername] = useState('');
  const [passwort, setPasswort] = useState('');
  const [fehlermeldung, setFehlermeldung] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const googleClientId = "your-google-client-id";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!benutzername || !passwort) {
      setFehlermeldung('Benutzername und Passwort dürfen nicht leer sein.');
      return;
    }
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ benutzername, passwort }),
      });
      if (!response.ok) throw new Error('Login fehlgeschlagen');
      const userData = await response.json();
      setUser({ isConnected: true, username: userData.username });
      navigate('/home');
    } catch (error) {
      setFehlermeldung(error.message || 'Login fehlgeschlagen');
    }
  };

  const handleLogin = (response) => {
    setUser({ isConnected: true, username: response.profileObj.name });
    navigate('/home');
  };

  const handleFailure = (error) => {
    setFehlermeldung("Anmeldung mit Google fehlgeschlagen. Bitte versuche es erneut.");
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
            <GoogleLogin
              clientId={googleClientId}
              buttonText="Mit Google anmelden"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            />
            {fehlermeldung && <div className="alert alert-danger" role="alert">{fehlermeldung}</div>}
            <p className="mt-3">Noch kein Konto? <Link to="/register">Konto erstellen</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
