const express = require('express');
const router = express.Router();
const notesController = require('./controllers/notesController');
const userController = require('./controllers/userController');

// Routes pour la gestion des notes
router.get('/notes', notesController.getAllNotes);
router.post('/notes', notesController.createNote);
router.put('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);

// Routes pour l'enregistrement des utilisateurs
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;
