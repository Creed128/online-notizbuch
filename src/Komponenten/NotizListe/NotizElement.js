import React from 'react';

const NotizElement = ({ notiz, bearbeiteNotiz, loescheNotiz }) => {
  return (
    <div className="card mb-3"> {/* Utilisation de la classe "card" pour un style cohérent */}
      <div className="card-body">
        <h3 className="card-title">{notiz.title}</h3>
        <p className="card-text">{notiz.content}</p>
        <button className="btn btn-primary" onClick={() => bearbeiteNotiz(notiz.id, { title: 'Neuer Titel', content: 'Neuer Inhalt' })}>
          Bearbeiten
        </button>
        <button className="btn btn-danger ml-2" onClick={() => loescheNotiz(notiz.id)}>
          Löschen
        </button>
      </div>
    </div>
  );
};

export default NotizElement;
