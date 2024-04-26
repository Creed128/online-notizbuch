import './notiz.css'; 

import React from 'react';

const Notiz = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  const handleBearbeiten = () => {
    const neuerTitel = prompt('Geben Sie den neuen Titel ein:');
    const neuerInhalt = prompt('Geben Sie den neuen Inhalt ein:');

    if (neuerTitel !== null && neuerInhalt !== null) {
      bearbeiteNotiz(notiz.id, { title: neuerTitel, content: neuerInhalt });
    }
  };

  return (
    <div className="card mb-3 notiz-element">
      <div className="card-body">
        <h3 className="card-title">{notiz.title}</h3>
        <p className="card-text">{notiz.content}</p>
        <p className="card-text"><small className="text-muted">Erstellt am: {notiz.erstellungsdatum}</small></p>
        <button className="btn btn-info" onClick={handleBearbeiten}>
          Bearbeiten
        </button>
        <button className="btn btn-danger ml-2" onClick={() => loescheNotiz(notiz.id)}>
          Löschen
        </button>
      </div>
    </div>
  );
};

export default Notiz;
