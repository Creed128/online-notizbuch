import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext'; // Assurez-vous d'importer UserContext correctement
import './NeueNotizFormular.css';

const NeueNotizFormular = ({ hinzufuegenNotiz }) => {
  const [titel, setTitel] = useState('');
  const [inhalt, setInhalt] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const { user } = useContext(UserContext);  // Utilisez useContext pour accéder à l'utilisateur connecté

  const handleTitelChange = (e) => setTitel(e.target.value);
  const handleInhaltChange = (e) => setInhalt(e.target.value);
  const handleSichtbarkeitChange = (e) => setIsPublic(e.target.value === 'oeffentlich');

  const handleNeueNotiz = () => {
    if (titel && inhalt) {
      const neueNotiz = {
        id: Date.now(),
        title: titel,
        content: inhalt,
        isPublic: isPublic,
        erstellungsdatum: new Date().toLocaleString(),
        owner: user && user.username  // Utilisez user.username si user n'est pas null
      };
      hinzufuegenNotiz(neueNotiz);
      setTitel('');
      setInhalt('');
      setIsPublic(true);
    }
  };

  return (
    <div className="new-note">
      <h2>Neue Notiz erstellen</h2>
      <input type="text" className="form-control" value={titel} onChange={handleTitelChange} placeholder="Titel eingeben..." />
      <textarea className="form-control" value={inhalt} onChange={handleInhaltChange} placeholder="Schreibe hier deine Notizen..." />
      <div>
        <label>
          <input type="radio" name="public-private" value="oeffentlich" checked={isPublic} onChange={handleSichtbarkeitChange} /> Öffentlich
        </label>
        <label>
          <input type="radio" name="public-private" value="privat" checked={!isPublic} onChange={handleSichtbarkeitChange} /> Privat
        </label>
      </div>
      <button className="btn btn-primary" onClick={handleNeueNotiz}>Notiz erstellen</button>
    </div>
  );
};

export default NeueNotizFormular;
