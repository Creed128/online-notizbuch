import React, { useState } from 'react';
import './NeueNotizFormular.css'; // Continuez à utiliser ce fichier pour les styles spécifiques non couverts par Bootstrap

const NeueNotizFormular = ({ hinzufuegenNotiz }) => {
  const [titel, setTitel] = useState('');
  const [inhalt, setInhalt] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleTitelChange = (e) => {
    setTitel(e.target.value);
  };

  const handleInhaltChange = (e) => {
    setInhalt(e.target.value);
  };

  const handleNeueNotiz = () => {
    if (titel && inhalt) {
      const erstellungsdatum = new Date().toLocaleString();
      hinzufuegenNotiz({
        id: Date.now(),
        title: titel,
        content: inhalt,
        isPublic: isPublic,
        erstellungsdatum,
      });
      setTitel('');
      setInhalt('');
      setIsPublic(isPublic);
    }
  };

  return (
    <div className="new-note">
      <h2>Neue Notiz erstellen</h2>
      <label className="form-label" htmlFor="title-input">Titel:</label>
      <input
        id="title-input"
        className="form-control"
        type="text"
        value={titel}
        onChange={handleTitelChange}
      />
      <label className="form-label" htmlFor="content-input">Inhalt:</label>
      <textarea
        id="content-input"
        className="form-control"
        value={inhalt}
        onChange={handleInhaltChange}
      />
      <div className="radios">
        <div className="form-check">
          <input
            type="radio"
            id="private"
            name="private-public"
            className="form-check-input"
            value={!isPublic}
            onChange={() => setIsPublic(false)}
          />
          <label className="form-check-label" htmlFor="private">Privat</label>
        </div>
        <div className="form-check">
          <input
            type="radio"
            id="public"
            name="private-public"
            className="form-check-input"
            value={isPublic}
            checked={isPublic}
            onChange={() => setIsPublic(true)}
          />
          <label className="form-check-label" htmlFor="public">Öffentlich</label>
        </div>
      </div>
      <button className="btn btn-primary" onClick={handleNeueNotiz}>
        Notiz erstellen
      </button>
    </div>
  );
};

export default NeueNotizFormular;
