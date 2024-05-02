import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import './NotizListe.css';

const NotizListe = () => {
  const { user } = useContext(UserContext);
  const [notizen, setNotizen] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const result = await axios.get('http://localhost:3002/api/notes');
        setNotizen(result.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const filteredNotes = notizen.filter(note => {
    return (filter === 'all' || (filter === 'public' && note.isPublic) || (filter === 'private' && !note.isPublic && note.owner === user.username)) &&
           (note.title.toLowerCase().includes(searchTerm.toLowerCase()) || note.content.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="notiz-liste-container">
      <input
        type="text"
        placeholder="Suche Notizen..."
        className="search-input"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="filters">
        <button onClick={() => setFilter('all')} className="filter-btn">Alle</button>
        <button onClick={() => setFilter('public')} className="filter-btn">Öffentlich</button>
        <button onClick={() => setFilter('private')} className="filter-btn">Privat</button>
      </div>
      <div className="note-cards">
        {filteredNotes.map(note => (
          <div key={note.id} className="note-card">
            <h4>{note.title}</h4>
            <p>Erstellt am: {formatDate(note.created_at)}</p>
            <button onClick={() => console.log('Detail View for', note.id)}>Voir Plus</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotizListe;
