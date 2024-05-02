const Note = require('../models/noteModel'); // Assurez-vous que le modèle de note est bien configuré

// Obtenir toutes les notes
exports.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).send("Erreur lors de la récupération des notes: " + error.message);
    }
};

// Créer une nouvelle note
exports.createNote = async (req, res) => {
    try {
        const newNote = new Note({
            title: req.body.title,
            content: req.body.content
        });
        await newNote.save();
        res.status(201).send('Note créée avec succès');
    } catch (error) {
        res.status(500).send("Erreur lors de la création de la note: " + error.message);
    }
};

// Mettre à jour une note
exports.updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content
        }, { new: true });
        if (!updatedNote) {
            return res.status(404).send('Note non trouvée');
        }
        res.status(200).send('Note mise à jour avec succès');
    } catch (error) {
        res.status(500).send("Erreur lors de la mise à jour de la note: " + error.message);
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
        res.status(500).send("Erreur lors de la suppression de la note: " + error.message);
    }
};
