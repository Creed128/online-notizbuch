import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import Notiz from '../Notiz/Notiz'; // Importation du composant Notiz
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
  
  const handleBearbeiten = async (id, updatedNote) => {
    try {
      const result = await axios.put(`http://localhost:3002/api/notes/${id}`, updatedNote);
      const updatedNotizen = notizen.map(note =>
        note.id === id ? { ...note, ...result.data } : note
      );
      setNotizen(updatedNotizen);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };
  
  const handleLoeschen = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/notes/${id}`);
      setNotizen(notizen.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
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
          <Notiz
            key={note.id}
            notiz={note}
            bearbeiteNotiz={handleBearbeiten}
            loescheNotiz={handleLoeschen}
          />
        ))}
      </div>
    </div>
  );
};

export default NotizListe;
