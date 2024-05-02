const User = require('../models/userModel');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already taken' });
        }
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: { username: newUser.username } });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Logged in successfully', user: { username: user.username } });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
