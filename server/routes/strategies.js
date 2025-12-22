const express = require('express');
const db = require('../database');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'grandprix_secret';

// Middleware to verify token
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

const requireAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Admin access required' });
    }
};

// GET All Strategies (Public or Protected? Let's make it protected for consistency, or public for user view)
// For now, let's allow public read (no auth) or simple auth. The previous implementation was mock data public.
// But admin features need auth.
router.get('/', (req, res) => {
    db.all("SELECT * FROM strategies", (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        // Map back to camelCase to match frontend expectation if needed
        // DB: pit_window, avg_pit_loss
        // Frontend likely expects: pitWindow, avgPitLoss (based on mockData)
        const strategies = rows.map(r => ({
            id: r.id,
            track: r.track,
            recommended: r.recommended,
            pitWindow: r.pit_window,
            undercutPotential: r.undercut_potential,
            avgPitLoss: r.avg_pit_loss
        }));

        res.json(strategies);
    });
});

// CREATE (Admin)
router.post('/', authenticate, requireAdmin, (req, res) => {
    const { track, recommended, pitWindow, undercutPotential, avgPitLoss } = req.body;

    if (!track) return res.status(400).json({ message: 'Track name is required' });

    db.run(`INSERT INTO strategies (track, recommended, pit_window, undercut_potential, avg_pit_loss) VALUES (?, ?, ?, ?, ?)`,
        [track, recommended, pitWindow, undercutPotential, avgPitLoss],
        function (err) {
            if (err) return res.status(500).json({ message: 'Failed to create strategy' });
            res.status(201).json({ id: this.lastID, track, recommended, pitWindow, undercutPotential, avgPitLoss });
        }
    );
});

// UPDATE (Admin)
router.put('/:id', authenticate, requireAdmin, (req, res) => {
    const { track, recommended, pitWindow, undercutPotential, avgPitLoss } = req.body;
    const id = req.params.id;

    db.run(`UPDATE strategies SET track=?, recommended=?, pit_window=?, undercut_potential=?, avg_pit_loss=? WHERE id=?`,
        [track, recommended, pitWindow, undercutPotential, avgPitLoss, id],
        function (err) {
            if (err) return res.status(500).json({ message: 'Failed to update' });
            if (this.changes === 0) return res.status(404).json({ message: 'Strategy not found' });
            res.json({ message: 'Updated successfully' });
        }
    );
});

// DELETE (Admin)
router.delete('/:id', authenticate, requireAdmin, (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM strategies WHERE id=?`, [id], function (err) {
        if (err) return res.status(500).json({ message: 'Failed to delete' });
        if (this.changes === 0) return res.status(404).json({ message: 'Strategy not found' });
        res.json({ message: 'Deleted successfully' });
    });
});

module.exports = router;
