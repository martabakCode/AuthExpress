// authRoutes.js
const express = require('express');
const router = express.Router();
const { hashPassword, comparePassword } = require('../auth');
const User = require('../models/Users');
const { generateToken } = require('../auth');

router.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({ username, password: hashedPassword, role });
        res.json({ user: newUser, token: generateToken(newUser) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.json({ user, token: generateToken(user) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
