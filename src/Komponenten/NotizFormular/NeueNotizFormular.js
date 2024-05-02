import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';  // Ensure the path is correct
import './NeueNotizFormular.css';

const NeueNotizFormular = () => {
  const [titel, setTitel] = useState('');
  const [inhalt, setInhalt] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();
  
  // Use useContext to access user and hinzufuegenNotiz from UserContext
  const { user, hinzufuegenNotiz } = useContext(UserContext);

  const handleNeueNotiz = async () => {
    if (!titel || !inhalt) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }

    try {
      const neueNotiz = {
        title: titel,
        content: inhalt,
        isPublic,
        owner: user.username  // now user is defined
      };

      await hinzufuegenNotiz(neueNotiz);
      setTitel('');
      setInhalt('');
      setIsPublic(true);
      alert('Notiz erfolgreich erstellt!');
      navigate('/notizen'); // Redirect to notes list page
    } catch (error) {
      console.error('Fehler beim Erstellen der Notiz:', error);
      alert('Fehler beim Erstellen der Notiz. Bitte versuchen Sie es erneut.');
    }
  };

  return (
    <div className="new-note">
      <h2>Neue Notiz erstellen</h2>
      <input
        type="text"
        className="form-control"
        value={titel}
        onChange={(e) => setTitel(e.target.value)}
        placeholder="Titel eingeben..."
      />
      <textarea
        className="form-control"
        value={inhalt}
        onChange={(e) => setInhalt(e.target.value)}
        placeholder="Schreibe hier deine Notizen..."
      />
      <div>
        <label>
          <input
            type="radio"
            name="public-private"
            value="oeffentlich"
            checked={isPublic}
            onChange={() => setIsPublic(true)}
          /> Öffentlich
        </label>
        <label>
          <input
            type="radio"
            name="public-private"
            value="privat"
            checked={!isPublic}
            onChange={() => setIsPublic(false)}
          /> Privat
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleNeueNotiz}>Notiz erstellen</button>
    </div>
  );
};

export default NeueNotizFormular;
