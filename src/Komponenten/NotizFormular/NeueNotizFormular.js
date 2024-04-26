import React, { useState } from 'react';
import './NeueNotizFormular.css'; // Assurez-vous que cela ne conflictue pas avec les styles de Bootstrap

const NeueNotizFormular = ({ hinzufuegenNotiz, benutzerVerbunden }) => {
  const [titel, setTitel] = useState('');
  const [inhalt, setInhalt] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleTitelChange = (e) => {
    setTitel(e.target.value);
  };

  const handleInhaltChange = (e) => {
    setInhalt(e.target.value);
  };

  const handleSichtbarkeitChange = (e) => {
    setIsPublic(e.target.value === 'oeffentlich');
  };

  const handleNeueNotiz = () => {
    if (titel && inhalt) {
      const erstellungsdatum = new Date().toLocaleString();
      const neueNotiz = {
        id: Date.now(),
        title: titel,
        content: inhalt,
        isPublic: isPublic,
        erstellungsdatum,
      };

      if (benutzerVerbunden.isConnected) {
        neueNotiz.owner = benutzerVerbunden.username;
      }

      hinzufuegenNotiz(neueNotiz);
      setTitel('');
      setInhalt('');
      setIsPublic(true);
    }
  };

  return (
    <div className="new-note">
      <h2>Neue Notiz erstellen</h2>
      <label className="form-label" htmlFor="title-input">Titel:</label>
      <input
        className="form-control"
        id="title-input"
        type="text"
        value={titel}
        onChange={handleTitelChange}
        placeholder="Titel eingeben..."
      />
      <label className="form-label" htmlFor="content-input">Inhalt:</label>
      <textarea
        className="form-control"
        id="content-input"
        value={inhalt}
        onChange={handleInhaltChange}
        placeholder="Schreibe hier deine Notizen..."
      />
      <div className="mb-3">
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="public-private"
            id="oeffentlich"
            value="oeffentlich"
            checked={isPublic}
            onChange={handleSichtbarkeitChange}
          />
          <label className="form-check-label" htmlFor="oeffentlich">Öffentlich</label>
        </div>
        {benutzerVerbunden.isConnected && (
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="public-private"
              id="privat"
              value="privat"
              checked={!isPublic}
              onChange={handleSichtbarkeitChange}
            />
            <label className="form-check-label" htmlFor="privat">Privat</label>
          </div>
        )}
      </div>
      <button className="btn btn-primary" onClick={handleNeueNotiz}>
        Notiz erstellen
      </button>
    </div>
  );
};

export default NeueNotizFormular;
