// userRoutes.js
const express = require('express');
const router = express.Router();
const { authorizeUser } = require('../middleware/authMiddleware');
const User = require('../models/Users');
const { generateToken } = require('../auth');

router.use(authorizeUser);

router.get('/users', authorizeUser(['admin']), async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/users', authorizeUser(['admin']), async (req, res) => {
    try {
        // Implementasi penambahan pengguna baru
        const { username, password, role } = req.body;
        const newUser = await User.create({ username, password, role });
        res.json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/users/:id', authorizeUser(['admin']), async (req, res) => {
    try {
        // Implementasi pembaruan pengguna berdasarkan ID
        const { id } = req.params;
        const { username, password, role } = req.body;
        const updatedUser = await User.update({ username, password, role }, { where: { id } });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/users/:id', authorizeUser(['admin']), async (req, res) => {
    try {
        // Implementasi penghapusan pengguna berdasarkan ID
        const { id } = req.params;
        const deletedUser = await User.destroy({ where: { id } });
        res.json({ message: 'User deleted successfully', deletedUser });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
