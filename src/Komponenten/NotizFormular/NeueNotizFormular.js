// NeueNotizFormular.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import './NeueNotizFormular.css';

const NeueNotizFormular = () => {
    const [titel, setTitel] = useState('');
    const [inhalt, setInhalt] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [createdAt, setCreatedAt] = useState(''); // Champ pour la date de création
    const navigate = useNavigate();

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
                owner: user.username,
                createdAt: createdAt || new Date().toISOString() // Utilisez la date fournie ou la date actuelle par défaut
            };

            await hinzufuegenNotiz(neueNotiz);
            setTitel('');
            setInhalt('');
            setIsPublic(true);
            setCreatedAt(''); // Réinitialiser la date
            alert('Notiz erfolgreich erstellt!');
            navigate('/notizen'); // Redirection vers la liste des notes
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
            <input
                type="datetime-local"
                className="form-control"
                value={createdAt}
                onChange={(e) => setCreatedAt(e.target.value)}
                placeholder="Datum der Erstellung eingeben..."
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
            <button
                className="btn btn-secondary"
                onClick={() => navigate('/notizen')}
                style={{ marginTop: '1rem' }}
            >
                Notiz Liste
            </button>
        </div>
    );
};

export default NeueNotizFormular;
