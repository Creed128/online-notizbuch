import React, { useState } from 'react';
import './notiz.css';

const Notiz = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoeschen = () => {
    const isConfirmed = window.confirm('Sind Sie sicher, dass Sie diese Notiz löschen möchten?');
    if (isConfirmed) {
      loescheNotiz(notiz._id);
    }
  };

  const handleBearbeiten = () => {
    const neuerTitel = prompt('Geben Sie den neuen Titel ein:', notiz.title);
    const neuerInhalt = prompt('Geben Sie den neuen Inhalt ein:', notiz.content);

    if (neuerTitel && neuerInhalt) {
      bearbeiteNotiz(notiz._id, { title: neuerTitel, content: neuerInhalt });
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const previewContent = notiz.content.slice(0, 100);
  const showMehrAnzeigen = notiz.content.length > 100;

  return (
    <div className="card mb-3 notiz-element">
      <div className="card-body">
        <h3 className="card-title">{notiz.title}</h3>
        <p className="card-text">{new Date(notiz.createdAt).toLocaleString()}</p>
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
