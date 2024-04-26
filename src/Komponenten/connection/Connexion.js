import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@leecheuk/react-google-login';
import { UserContext } from '../../contexts/UserContext';  // Import the named export
import './Connexion.css'; 
import { Link } from 'react-router-dom';


const Connexion = () => {
  const [benutzername, setBenutzername] = useState('');
  const [passwort, setPasswort] = useState('');
  const [fehlermeldung, setFehlermeldung] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); // Use setUser from UserContext
  const googleClientId = "676727747121-9jn8h48vo577r6dlklj4to180hla9689.apps.googleusercontent.com";


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
      setUser({ isConnected: true, username: userData.username }); // Set global user context
      navigate('/home'); // Adjust as necessary, perhaps '/dashboard' was intended?
    } catch (error) {
      setFehlermeldung(error.message);
    }
  };

  const handleLogin = (response) => {
    setUser({ isConnected: true, username: response.profileObj.name });
    navigate('/home'); // Adjust navigation as necessary
  };

  const handleFailure = (error) => {
    setFehlermeldung("Anmeldung mit Google fehlgeschlagen. Bitte versuche es erneut.");
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <h3>Anmeldeinformationen</h3>
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
          </form>
          <p> Noch kein  account? <a href="/register">Konto erstellen </a></p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
