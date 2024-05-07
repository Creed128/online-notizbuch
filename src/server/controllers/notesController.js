const Note = require('../models/noteModel');

// Retrieve notes based on whether they're public or private and user ownership
exports.getAllNotes = async (req, res) => {
  const { username } = req.query; // Username from query string
  try {
    const filter = {
      $or: [
        { isPublic: true }, // Public notes
        { owner: username } // Private notes owned by the logged-in user
      ]
    };
    const notes = await Note.find(filter);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).send("Error fetching notes: " + error.message);
  }
};

exports.createNote = async (req, res) => {
  try {
    const newNote = new Note({
      title: req.body.title,
      content: req.body.content,
      isPublic: req.body.isPublic || true,
      owner: req.body.owner,
      createdAt: req.body.createdAt || new Date()
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).send('Error creating note: ' + error.message);
  }
};
