import React, { useState } from 'react';
import './notiz.css';

const Notiz = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoeschen = () => {
    if (window.confirm('Sind Sie sicher, dass Sie diese Notiz löschen möchten?')) {
      loescheNotiz(notiz._id); // Utilisez notiz._id
    }
  };

  const handleBearbeiten = () => {
    const neuerTitel = prompt('Geben Sie den neuen Titel ein:', notiz.title);
    const neuerInhalt = prompt('Geben Sie den neuen Inhalt ein:', notiz.content);

    if (neuerTitel && neuerInhalt) {
      bearbeiteNotiz(notiz._id, { title: neuerTitel, content: neuerInhalt }); // Utilisez notiz._id
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const previewContent = notiz.content.slice(0, 100);
  const showMehrAnzeigen = notiz.content.length > 100;

  // Vérifiez si `createdAt` est défini et formatez-le
  const createdAt = notiz.createdAt ? new Date(notiz.createdAt).toLocaleString() : 'Invalid Date';

  return (
    <div className="card mb-3 notiz-element">
      <div className="card-body">
        <h3 className="card-title">{notiz.title}</h3>
        <p className="card-text">
          <small className="text-muted">Erstellt am: {createdAt}</small> {/* Utiliser `createdAt` pour afficher */}
        </p>
        <p className="card-text">
          {isExpanded ? notiz.content : previewContent}
          {showMehrAnzeigen && !isExpanded && '...'}
        </p>
        {showMehrAnzeigen && (
          <button onClick={toggleExpanded} className="btn btn-secondary">
            {isExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
          </button>
        )}
        <button className="btn btn-info ml-2" onClick={handleBearbeiten}>
          Bearbeiten
        </button>
        <button className="btn btn-danger ml-2" onClick={handleLoeschen}>
          Löschen
        </button>
      </div>
    </div>
  );
};

export default Notiz;
