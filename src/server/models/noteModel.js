const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
