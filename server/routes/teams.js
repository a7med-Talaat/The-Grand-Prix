const express = require('express');
const { TEAMS } = require('../data/mockData');
const router = express.Router();

// Get all teams
router.get('/', (req, res) => {
    // Return simplified list for gallery
    const galleryTeams = TEAMS.map(t => ({
        id: t.id,
        name: t.name,
        image: t.image,
        color: t.color
    }));
    res.json(galleryTeams);
});

// Get team details
router.get('/:id', (req, res) => {
    const teamId = parseInt(req.params.id);
    const team = TEAMS.find(t => t.id === teamId);

    if (!team) {
        return res.status(404).json({ message: 'Team not found' });
    }

    res.json(team);
});

module.exports = router;
