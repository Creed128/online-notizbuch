// userController.js
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Fonction d'inscription de l'utilisateur
exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Nom d\'utilisateur déjà pris' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
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
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Identifiants incorrects' });
        }
        res.status(200).json({ message: 'Connexion réussie', user: { username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Échec de la connexion', error: error.message });
    }
};
