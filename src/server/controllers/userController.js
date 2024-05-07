const User = require('../models/userModel');

// Fonction d'inscription de l'utilisateur
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Nom d\'utilisateur déjà pris' });
        }
        const newUser = new User({ username, password }); // Sauvegarde du mot de passe directement
        await newUser.save();
        res.status(201).json({ message: 'Utilisateur enregistré avec succès', user: { username: newUser.username } });
    } catch (error) {
        res.status(500).json({ message: 'Échec de l\'inscription', error: error.message });
    }
};

// Fonction de connexion de l'utilisateur
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) { // Comparaison directe du mot de passe
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }
        res.status(200).json({ message: 'Connexion réussie', user: { username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Échec de la connexion', error: error.message });
    }
};
