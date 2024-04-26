import axios from 'axios';
import { useEffect, useState } from 'react';

const FetchNotes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => console.error('Error fetching notes:', error));
  }, []);

  return (
    <div>
      {notes.map(note => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default FetchNotes;
