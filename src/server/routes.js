// routes.js
const express = require('express');
const router = express.Router();
const notesController = require('./notesController');

// Route pour obtenir toutes les notes
router.get('/notes', notesController.getAllNotes);

// Route pour ajouter une nouvelle note
router.post('/notes', notesController.createNote);

// Route pour mettre à jour une note
router.put('/notes/:id', notesController.updateNote);

// Route pour supprimer une note
router.delete('/notes/:id', notesController.deleteNote);

module.exports = router;
