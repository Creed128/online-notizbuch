const Note = require('../models/noteModel');

// Récupérer toutes les notes
exports.getAllNotes = async (req, res) => {
  const { username } = req.query; // Nom d'utilisateur à partir de la chaîne de requête
  try {
    const filter = {
      $or: [
        { isPublic: true }, // Notes publiques
        { owner: username } // Notes privées appartenant à l'utilisateur connecté
      ]
    };
    const notes = await Note.find(filter);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des notes", error: error.message });
  }
};

// Créer une nouvelle note
exports.createNote = async (req, res) => {
  const { title, content, isPublic, owner } = req.body;
  if (!title || !content || !owner) {
    return res.status(400).json({ message: 'Veuillez fournir un titre, un contenu et un propriétaire' });
  }

  try {
    const newNote = new Note({
      title,
      content,
      isPublic: isPublic ?? true, // Si `isPublic` n'est pas fourni, la valeur par défaut est `true`
      owner,
      createdAt: new Date()
    });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la note', error: error.message });
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
