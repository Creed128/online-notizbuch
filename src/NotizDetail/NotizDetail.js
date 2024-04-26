import React from 'react';
import './NotizDetail.css';

class NotizDetail extends React.Component {
  render() {
    const { notiz } = this.props; // Assurez-vous de passer 'notiz' comme propriété à ce composant

    return (
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{notiz ? notiz.title : 'Laden...'}</h2>
          <p className="card-text">{notiz ? notiz.content : 'Keine Details verfügbar.'}</p>
          <p className="card-text"><small className="text-muted">Erstellt am: {notiz ? notiz.erstellungsdatum : '-'}</small></p>
        </div>
      </div>
    );
  }
}

export default NotizDetail;
