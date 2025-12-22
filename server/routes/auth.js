const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'grandprix_secret';

// Register
router.post('/register', (req, res) => {
    const { username, password, country } = req.body;

    if (!username || !password || !country) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = bcrypt.hashSync(password, 8);
        const role = username === 'admin' ? 'admin' : 'user';

        // Insert new user
        const createdAt = new Date().toISOString().replace('T', ' ').split('.')[0];
        db.run('INSERT INTO users (username, password, country, role, created_at) VALUES (?, ?, ?, ?, ?)',
            [username, hashedPassword, country, role, createdAt],
            function (err) {
                if (err) return res.status(500).json({ message: 'Error registering user' });

                const id = this.lastID;
                const token = jwt.sign({ id, role, username }, JWT_SECRET, { expiresIn: '1h' });

                res.status(201).json({
                    token,
                    user: { id, username, country, role }
                });
            }
        );
    });
});

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (!user) return res.status(401).json({ message: 'Invalid credentials' });

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) return res.status(401).json({ message: 'Invalid credentials' });

        if (user.status === 'banned') {
            return res.status(403).json({ message: 'Your account is banned. Please contact the administrator.' });
        }

        const token = jwt.sign({ id: user.id, role: user.role, username: user.username }, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: { id: user.id, username: user.username, country: user.country, role: user.role }
        });
    });
});

module.exports = router;
