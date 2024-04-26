import React, { useState } from 'react';
import './search.css';

function Search() {
  const [searchInput, setSearchInput] = useState('');
  const [notes, setNotes] = useState(['Notiz 1', 'Notiz 2', 'Notiz 3']);
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = () => {
    const lowercaseSearchInput = searchInput.toLowerCase();
    const filtered = notes.filter((note) =>
      note.toLowerCase().includes(lowercaseSearchInput)
    );
    setFilteredNotes(filtered);
  };

  return (
    <div className="search-box">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Suche..."
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={handleSearch}>
            Suchen
          </button>
        </div>
      </div>
      <ul className="list-group">
        {filteredNotes.map((note, index) => (
          <li key={index} className="list-group-item">{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
