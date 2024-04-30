const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');
const notesController = require('./controllers/notesController');

// Routes pour la gestion des notes
router.get('/notes', notesController.getAllNotes);
router.post('/notes', notesController.createNote);
router.put('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);

// Route pour l'enregistrement des utilisateurs
router.post('/register', userController.registerUser);

// Ajout de la route pour la connexion des utilisateurs
router.post('/login', userController.loginUser);

module.exports = router;
