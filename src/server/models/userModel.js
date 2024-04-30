const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }  // Attention : stocker les mots de passe en clair est dangereux.
});

const User = mongoose.model('User', userSchema);

module.exports = User;
