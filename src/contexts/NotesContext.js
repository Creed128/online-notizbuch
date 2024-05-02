import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);

    const fetchNotes = useCallback(async () => {
        try {
            const response = await axios.get('http://localhost:3002/api/notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }, []);

    const addNote = useCallback(async (note) => {
        try {
            const response = await axios.post('http://localhost:3002/api/notes', note);
            setNotes(prevNotes => [...prevNotes, response.data]);
        } catch (error) {
            console.error('Error adding note:', error);
        }
    }, []);

    const updateNote = useCallback(async (id, updatedNote) => {
        try {
            await axios.put(`http://localhost:3002/api/notes/${id}`, updatedNote);
            fetchNotes();
        } catch (error) {
            console.error('Error updating note:', error);
        }
    }, [fetchNotes]);

    const deleteNote = useCallback(async (id) => {
        try {
            await axios.delete(`http://localhost:3002/api/notes/${id}`);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }, [fetchNotes]);

    return (
        <NotesContext.Provider value={{ notes, addNote, updateNote, deleteNote, fetchNotes }}>
            {children}
        </NotesContext.Provider>
    );
};
