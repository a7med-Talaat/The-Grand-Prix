const express = require('express');
const db = require('../database');
const { TEAMS } = require('../data/mockData');
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

// Create Meetup
router.post('/', authenticate, (req, res) => {
    console.log('--- POST /api/meetups params ---');
    console.log('User:', req.user);
    console.log('Body:', req.body);

    const { teamId, date } = req.body;

    if (!teamId || !date) {
        console.error('Missing teamId or date');
        return res.status(400).json({ message: 'Team and Date are required' });
    }

    // Get user from DB to check country match
    db.get('SELECT * FROM users WHERE id = ?', [req.user.id], (err, user) => {
        if (err) {
            console.error('Database error fetching user:', err.message);
            return res.status(500).json({ message: 'Database error: ' + err.message });
        }
        if (!user) {
            console.error('User not found in DB for ID:', req.user.id);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user.username, user.country);

        const team = TEAMS.find(t => t.id === Number(teamId));
        if (!team) {
            console.error('Team not found for ID:', teamId);
            return res.status(404).json({ message: 'Team not found' });
        }

        console.log('Team found:', team.name);

        // Logic: Online or Offline
        let type = 'Online';
        let location = 'Zoom / Google Meet';

        if (user.country === team.boothCountry) {
            type = 'Offline';
            location = `${team.boothCountry} Fan Booth`;
        }

        const status = 'Pending';

        console.log('Attempting to insert meetup...');

        db.run(`INSERT INTO meetups (user_id, author, team_id, team_name, date, type, location, status) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [user.id, user.username, team.id, team.name, date, type, location, status],
            function (err) {
                if (err) {
                    console.error("Insert Error in meetups:", err.message);
                    return res.status(500).json({ message: 'Failed to create meetup: ' + err.message });
                }

                const newMeetup = {
                    id: this.lastID,
                    userId: user.id,
                    author: user.username,
                    teamId: team.id,
                    teamName: team.name,
                    date,
                    type,
                    location,
                    status
                };

                console.log('Meetup inserted successfully with ID:', this.lastID);

                res.status(201).json({
                    message: `Meetup requested! It will be ${type}.`,
                    meetup: newMeetup
                });
            }
        );
    });
});

// Get Meetups
router.get('/', authenticate, (req, res) => {
    let query = 'SELECT * FROM meetups';
    let params = [];

    if (req.user.role !== 'admin') {
        query += ' WHERE user_id = ?';
        params.push(req.user.id);
    }

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ message: 'Database error' });

        const meetups = rows.map(row => ({
            id: row.id,
            userId: row.user_id,
            author: row.author,
            teamId: row.team_id,
            teamName: row.team_name,
            date: row.date,
            type: row.type,
            location: row.location,
            status: row.status
        }));

        res.json(meetups);
    });
});

// Approve/Reject (Admin only)
router.patch('/:id', authenticate, (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Admins only' });
    }

    const { status } = req.body;
    if (!['Approved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }

    const id = req.params.id;

    db.run('UPDATE meetups SET status = ? WHERE id = ?', [status, id], function (err) {
        if (err) return res.status(500).json({ message: 'Database error' });
        if (this.changes === 0) return res.status(404).json({ message: 'Meetup not found' });

        // Return updated object
        db.get('SELECT * FROM meetups WHERE id = ?', [id], (err, row) => {
            if (err || !row) return res.json({ message: 'Updated' });

            res.json({
                id: row.id,
                userId: row.user_id,
                author: row.author,
                teamId: row.team_id,
                teamName: row.team_name,
                date: row.date,
                type: row.type,
                location: row.location,
                status: row.status
            });
        });
    });
});

module.exports = router;
