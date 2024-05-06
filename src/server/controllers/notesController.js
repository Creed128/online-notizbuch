const Note = require('../models/noteModel');

exports.createNote = async (req, res) => {
    try {
      const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        isPublic: req.body.isPublic || true,
        owner: req.body.owner,
        createdAt: req.body.createdAt || new Date() // Ajouter cette ligne pour utiliser la date actuelle si non spécifiée
      });
      await newNote.save();
      res.status(201).json(newNote);
    } catch (error) {
      res.status(500).send('Erreur lors de la création de la note : ' + error.message);
    }
  };
  

// Mettre à jour une note
exports.updateNote = async (req, res) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      isPublic: req.body.isPublic,
      owner: req.body.owner,
      createdAt: req.body.createdAt || new Date() // Conserver la date d'origine ou mettre à jour
    }, { new: true });
    if (!updatedNote) {
      return res.status(404).send('Note non trouvée');
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).send('Erreur lors de la mise à jour de la note : ' + error.message);
  }
};

// Supprimer une note
exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      return res.status(404).send('Note non trouvée');
    }
    res.status(200).send('Note supprimée avec succès');
  } catch (error) {
    res.status(500).send('Erreur lors de la suppression de la note : ' + error.message);
  }
};
