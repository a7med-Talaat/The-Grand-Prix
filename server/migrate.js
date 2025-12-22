const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'grandprix.db');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    console.log('Running migration...');

    // Status column (already exists based on previous output, but safe to keep check)
    db.run("ALTER TABLE users ADD COLUMN status TEXT DEFAULT 'active'", (err) => {
        if (err && !err.message.includes('duplicate column')) {
            console.error('Error adding status column:', err.message);
        } else {
            console.log('Status column checked/added.');
        }
    });

    // Created_at column - add without default, then update
    db.run("ALTER TABLE users ADD COLUMN created_at TEXT", (err) => {
        if (err) {
            if (err.message.includes('duplicate column')) {
                console.log('Column created_at already exists.');
            } else {
                console.error('Error adding created_at column:', err.message);
            }
        } else {
            console.log('Added created_at column (nullable).');
            // Backfill
            db.run("UPDATE users SET created_at = datetime('now') WHERE created_at IS NULL", (err) => {
                if (err) console.error("Error backfilling dates:", err);
                else console.log("Backfilled created_at for existing users.");
            });
        }
    });
});

db.close();
