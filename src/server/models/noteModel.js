// src/server/models/noteModel.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    isPublic: { type: Boolean, default: true },
    owner: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }, 
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;