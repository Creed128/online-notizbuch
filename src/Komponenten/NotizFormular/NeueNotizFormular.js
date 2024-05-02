import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './NeueNotizFormular.css'; // Assurez-vous que le chemin est correct

const NeueNotizFormular = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublic, setIsPublic] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ title, content, isPublic });
        // Ajouter ici la logique pour envoyer les données au serveur
    };

    return (
        <div className="neue-notiz-container">
            <h2 className="neue-notiz-title">Neue Notiz erstellen</h2>
            <form onSubmit={handleSubmit} className="neue-notiz-form">
                <input
                    type="text"
                    placeholder="Titel eingeben..."
                    className="neue-notiz-input"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Schreibe hier deine Notizen..."
                    className="neue-notiz-textarea"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                />
                <div className="neue-notiz-radios">
                    <label className="label-radio">
                        <input
                            type="radio"
                            name="privacy"
                            checked={isPublic}
                            onChange={() => setIsPublic(true)}
                        /> Öffentlich
                    </label>
                    <label className="label-radio">
                        <input
                            type="radio"
                            name="privacy"
                            checked={!isPublic}
                            onChange={() => setIsPublic(false)}
                        /> Privat
                    </label>
                </div>
                <button type="submit" className="neue-notiz-button">Notiz erstellen</button>
            </form>
        </div>
    );
};

export default NeueNotizFormular;
