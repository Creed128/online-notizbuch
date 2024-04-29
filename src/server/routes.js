
const express = require('express');
const router = express.Router();
const userController = require('./userController');
const notesController = require('./notesController');

// Existing routes for notes
router.get('/notes', notesController.getAllNotes);
router.post('/notes', notesController.createNote);
router.put('/notes/:id', notesController.updateNote);
router.delete('/notes/:id', notesController.deleteNote);

// New route for user registration
router.post('/register', userController.registerUser);

module.exports = router;
