const express = require('express');
const db = require('../database');
const router = express.Router();

// Get all users with full details
router.get('/', (req, res) => {
    db.all('SELECT id, username, country, role, status, created_at, password FROM users', [], (err, rows) => {
        if (err) {
            console.error('Database Error in GET /users:', err.message);
            return res.status(500).json({ message: `Database error: ${err.message}` });
        }
        res.json(rows);
    });
});

// Update user status (Ban/Unban)
router.patch('/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'banned'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    db.run('UPDATE users SET status = ? WHERE id = ?', [status, id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `User ${status === 'banned' ? 'banned' : 'unbanned'} successfully` });
    });
});

// Delete a user
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

module.exports = router;
