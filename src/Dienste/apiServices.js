import axios from 'axios';

const apiBaseURL = 'http://localhost:3002/api';

export const fetchNotes = async () => {
  return axios.get(`${apiBaseURL}/notes`);
};

export const createNote = async (note) => {
  return axios.post(`${apiBaseURL}/notes`, note);
};

export const updateNote = async (id, note) => {
  return axios.put(`${apiBaseURL}/notes/${id}`, note);
};

export const deleteNote = async (id) => {
  return axios.delete(`${apiBaseURL}/notes/${id}`);
};
