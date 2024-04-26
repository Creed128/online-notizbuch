import React from 'react';
import Notiz from '../Notiz/Notiz';

const NotizListe = ({ notizen, bearbeiteNotiz, loescheNotiz, benutzerVerbunden }) => {
  const filterNachSichtbarkeit = (notiz) => {
    if (!benutzerVerbunden.isConnected) {
      return notiz.isPublic; // Afficher uniquement les notes publiques pour les utilisateurs non connectés
    }
    // Pour les utilisateurs connectés, afficher les notes publiques et les privées de l'utilisateur
    return notiz.isPublic || notiz.owner === benutzerVerbunden.username;
  };

  return (
    <div className="container">
      <div className="row">
        {notizen.filter(filterNachSichtbarkeit).map((notiz) => (
          <div key={notiz.id} className="col-md-4 mb-4">
            <Notiz
              notiz={notiz}
              bearbeiteNotiz={bearbeiteNotiz}
              loescheNotiz={loescheNotiz}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotizListe;
