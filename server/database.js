const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connect to SQLite database
const dbPath = path.resolve(__dirname, 'grandprix.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Initialize Database Schema
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT,
        country TEXT,
        role TEXT DEFAULT 'user',
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error('Error creating users table:', err.message);
        } else {
            console.log('Users table ready.');

            // Migration for existing tables: Try to add columns if they don't exist
            // This is a simple way to handle schema updates in SQLite for this project
            db.run("ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active'", (err) => {
                // Ignore error if column exists
            });
            db.run("ALTER TABLE users ADD COLUMN created_at DATETIME DEFAULT CURRENT_TIMESTAMP", (err) => {
                // Ignore error if column exists
            });
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS meetups (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        author TEXT,
        team_id INTEGER,
        team_name TEXT,
        date TEXT,
        type TEXT,
        location TEXT,
        status TEXT DEFAULT 'Pending'
    )`, (err) => {
        if (err) {
            console.error('Error creating meetups table:', err.message);
        } else {
            console.log('Meetups table ready.');
        }
    });

    db.run(`CREATE TABLE IF NOT EXISTS strategies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        track TEXT,
        recommended TEXT,
        pit_window TEXT,
        undercut_potential TEXT,
        avg_pit_loss TEXT
    )`, (err) => {
        if (err) {
            console.error('Error creating strategies table:', err.message);
        } else {
            console.log('Strategies table ready.');

            // Seed if empty
            db.get("SELECT count(*) as count FROM strategies", (err, row) => {
                if (err || row.count > 0) return;

                const { STRATEGIES } = require('./data/mockData');
                if (!STRATEGIES) return;

                const stmt = db.prepare("INSERT INTO strategies (track, recommended, pit_window, undercut_potential, avg_pit_loss) VALUES (?, ?, ?, ?, ?)");
                STRATEGIES.forEach(s => {
                    stmt.run(s.track, s.recommended, s.pitWindow, s.undercutPotential, s.avgPitLoss);
                });
                stmt.finalize();
                console.log('Seeded strategies table w/ mock data');
            });
        }
    });
});

module.exports = db;
